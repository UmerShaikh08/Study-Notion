import { useEffect, useState, useRef } from "react";
import { API_ROUTES } from "../API_ROUTES";
import useGlobalMutation from "./useGlobalMutation";
import { addToast } from "@heroui/react";

interface IProps {
    files: File[];
    email?: string;
}

type FileStatus =
    | "pending"
    | "getting_url"
    | "uploading"
    | "completed"
    | "error";

interface FileUploadItem {
    file: File;
    email?: string;
    presignedUrl?: string;
    key?: string;
    status: FileStatus;
}

const useUploadFile = () => {
    // Core states
    const [isUploading, setIsUploading] = useState(false);
    const [uploadQueue, setUploadQueue] = useState<FileUploadItem[]>([]);
    const processingRef = useRef(false);
    const resolveRef = useRef<((value: string[]) => void) | null>(null);

    // Derived states
    const uploadedFiles = uploadQueue
        .filter((item) => item.status === "completed")
        .map((item) => item.key!)
        .filter(Boolean);

    const uploadErrors = uploadQueue
        .filter((item) => item.status === "error")
        .map((item) => item.file.name);

    const progress = uploadQueue.length
        ? Math.round(
              (uploadQueue.filter((item) => item.status === "completed")
                  .length /
                  uploadQueue.length) *
                  100
          )
        : 0;

    const { runMutation, mutationData, isMutationSucceeded } =
        useGlobalMutation({
            url: API_ROUTES.FEATURES.GENERATE_PRESIGNED_URL,
            methodType: "POST",
            hideSuccessToast: true,
        });

    // Update file status in queue
    const updateFileStatus = (
        fileName: string,
        newStatus: FileStatus,
        additionalData = {}
    ) => {
        setUploadQueue((prev) =>
            prev.map((item) =>
                item.file.name === fileName
                    ? { ...item, status: newStatus, ...additionalData }
                    : item
            )
        );
    };

    // Process the next file in queue
    const processNextInQueue = () => {
        if (processingRef.current) return;

        const pendingFile = uploadQueue.find(
            (item) => item.status === "pending"
        );
        if (!pendingFile) return;

        processingRef.current = true;
        updateFileStatus(pendingFile.file.name, "getting_url");

        runMutation({
            isPriorityDataAvailable: true,
            priorityData: {
                type: pendingFile.file.type,
                name: pendingFile.file.name,
                email: pendingFile.email,
            },
        });
    };

    // Handle presigned URL generation and upload
    useEffect(() => {
        if (!isMutationSucceeded || !mutationData?.data?.result?.url) return;

        const processingFile = uploadQueue.find(
            (item) => item.status === "getting_url"
        );
        if (!processingFile) {
            processingRef.current = false;
            return;
        }

        const { url, key } = mutationData.data.result;
        updateFileStatus(processingFile.file.name, "uploading", {
            presignedUrl: url,
            key,
        });

        // Upload file to S3
        fetch(url, {
            method: "PUT",
            body: processingFile.file,
            headers: {
                "Content-Type": processingFile.file.type,
            },
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error(`Upload failed: ${response.statusText}`);
                updateFileStatus(processingFile.file.name, "completed");
            })
            .catch((error) => {
                console.error("Upload error:", error);
                updateFileStatus(processingFile.file.name, "error");
                addToast({
                    title: `Failed to upload ${processingFile.file.name}`,
                    color: "danger",
                });
            })
            .finally(() => {
                processingRef.current = false;
            });
    }, [isMutationSucceeded, mutationData]);

    // Monitor queue status
    useEffect(() => {
        // Process next file if available
        if (
            uploadQueue.some((item) => item.status === "pending") &&
            !processingRef.current
        ) {
            processNextInQueue();
        }

        // Check if all files are processed
        const allCompleted =
            uploadQueue.length > 0 &&
            uploadQueue.every((item) =>
                ["completed", "error"].includes(item.status)
            );

        if (allCompleted && isUploading) {
            setIsUploading(false);

            // Resolve the promise with the uploaded file keys
            if (resolveRef.current) {
                resolveRef.current(uploadedFiles);
                resolveRef.current = null;
            }
        }
    }, [uploadQueue, isUploading, uploadedFiles]);

    // Main function to initiate upload - returns a promise
    const uploadFiles = ({ files, email }: IProps) => {
        if (!files.length) return Promise.resolve([]);

        setIsUploading(true);
        processingRef.current = false;

        setUploadQueue(
            files.map((file) => ({
                file,
                email,
                status: "pending",
            }))
        );

        // Return a promise that resolves when all uploads are complete
        return new Promise<string[]>((resolve) => {
            resolveRef.current = resolve;
        });
    };

    return {
        uploadFiles,
        isUploading,
        uploadedFiles,
        uploadErrors,
        progress,
    };
};

export default useUploadFile;
