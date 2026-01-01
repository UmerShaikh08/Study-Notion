import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";

export default function Upload({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) {
    const { course } = useSelector((state) => state.course);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(viewData ? viewData : editData ? editData : "");
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef(null);

    // Check if file is image or video
    const isImageOrVideo = (file) => {
        if (!file) return false;
        const type = file.type || "";
        return type.startsWith("image/") || type.startsWith("video/");
    };

    // Upload file to S3
    const uploadFile = async (file) => {
        if (!isImageOrVideo(file)) {
            console.error("Only images and videos are supported");
            return null;
        }

        try {
            setIsUploading(true);

            const baseUrl = process.env.REACT_APP_BASE_URL || "";
            const response = await fetch(`${baseUrl}/uploads/presigned-url`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: file.type,
                    name: file.name,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to get presigned URL: ${response.statusText}`);
            }

            const data = await response.json();
            const { url, key } = data.result || data;

            if (!url) {
                throw new Error("No presigned URL received");
            }

            // Upload file to S3
            const uploadResponse = await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed: ${uploadResponse.statusText}`);
            }

            return key;
        } catch (error) {
            console.error("Upload error:", error);
            alert(`Failed to upload file: ${error.message}`);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        // Check if file is image or video
        if (!isImageOrVideo(file)) {
            alert("Please select an image or video file");
            return;
        }

        // Show preview immediately
        previewFile(file);
        setSelectedFile(file);

        // Upload file to S3
        const uploadedKey = await uploadFile(file);
        if (uploadedKey) {
            // Set the uploaded file key/URL in the form
            setValue(name, uploadedKey);
        } else {
            // If upload failed, clear the preview
            setPreviewSource("");
            setSelectedFile(null);
            setValue(name, null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: !video ? { "image/*": [".jpeg", ".jpg", ".png", ".webp"] } : { "video/*": [".mp4", ".webm"] },
        onDrop,
        disabled: isUploading,
    });

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    useEffect(() => {
        register(name, { required: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register]);

    // Note: setValue is now called in onDrop after upload completes
    // This useEffect is kept for backward compatibility but won't set the file object
    // Instead, it sets the uploaded key/URL

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} {!viewData && <sup className="text-pink-200">*</sup>}
            </label>
            <div
                className={`${
                    isDragActive ? "bg-richblack-600" : "bg-richblack-700"
                } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                {previewSource ? (
                    <div className="flex w-full flex-col p-6">
                        {!video ? (
                            <img src={previewSource} alt="Preview" className="h-full w-full rounded-md object-cover" />
                        ) : (
                            <VideoPlayer src={previewSource} aspectRatio="16:9" playsInline />
                        )}
                        {!viewData && (
                            <button
                                type="button"
                                onClick={() => {
                                    setPreviewSource("");
                                    setSelectedFile(null);
                                    setValue(name, null);
                                }}
                                className="mt-3 text-richblack-400 underline"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ) : (
                    <label htmlFor="video" className="">
                        <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
                            <input {...getInputProps()} ref={inputRef} id="video" />

                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                <FiUploadCloud className="text-2xl text-yellow-50" />
                            </div>
                            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                {isUploading ? (
                                    "Uploading..."
                                ) : (
                                    <>
                                        Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                                        <span className="font-semibold text-yellow-50">Browse</span> a file
                                    </>
                                )}
                            </p>
                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    </label>
                )}
            </div>
            {errors[name] && <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>}
        </div>
    );
}
