import { PlusIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import EmptyState from "./EmptyState";
import { ScrollShadow } from "@heroui/react";
import { Document, Page, pdfjs } from "react-pdf";
import PDFViewer from "./PDFViewer";
import useMobile from "../hooks/useMobile";
import {
    isBinaryVideo,
    isFileIsPdf,
    isPdf,
    isVideo,
} from "../utils/ReusableFunctions";
import { Icon } from "@iconify/react";
import icons from "@/constants/Icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export enum FileFormat {
    JPEG = ".jpeg",
    JPG = ".jpg",
    PNG = ".png",
    WEBP = ".webp",
    MP4 = ".mp4",
    WEBM = ".webm",
    PDF = ".pdf",
}

interface FileUploaderProps {
    imageAssets: (File | string)[];
    setImageAssets: React.Dispatch<any>;
    multiple?: boolean;
    readonly?: boolean;
    isImageOnly?: boolean;
    label?: string;
    supportedFormats?: FileFormat[];
    customTrigger?: React.ReactNode;
    customImage?: string;
    customImageSize?: string;
    showIcon?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    imageAssets,
    setImageAssets,
    multiple,
    readonly,
    isImageOnly,
    label,
    supportedFormats,
    customTrigger,
    customImage,
    customImageSize,
    showIcon = false,
}) => {
    const inputRef = useRef<any>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Get accepted file formats
    const getAcceptedFormats = () => {
        if (supportedFormats) {
            return supportedFormats.join(",");
        }
        if (isImageOnly) {
            return [
                FileFormat.JPEG,
                FileFormat.JPG,
                FileFormat.PNG,
                FileFormat.WEBP,
            ].join(",");
        }
        return Object.values(FileFormat).join(",");
    };

    // Handle dropped files
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length) {
            setImageAssets((prevImages: any) => [
                ...(prevImages || []),
                ...files,
            ]);
        }
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageAssets((prevImages: any) => [
                ...(prevImages || []),
                ...Array.from(e.target.files || []),
            ]);
        }
    };

    // Drag event handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    return (
        <div>
            <div
                className={`lg:flex ${
                    imageAssets?.length > 1 ? "gap-5" : "gap-0"
                }`}
            >
                {imageAssets && imageAssets?.length > 0 ? (
                    <FileMapper
                        imageAssets={imageAssets}
                        setImageAssets={setImageAssets}
                        inputRef={inputRef}
                        multiple={multiple}
                        readonly={readonly}
                        customImage={customImage}
                        customImageSize={customImageSize}
                        showIcon={showIcon}
                    />
                ) : (
                    !readonly && (
                        <EmptyState
                            label={label ?? "Drag photos & videos here"}
                            description={
                                "Drag and drop your photos or videos here, or click to browse from your device.\nSupported formats: JPG, PNG, MP4, & more.\nMaximum file size: 32MB."
                            }
                            buttonLabel="Select from computer"
                            isDragging={isDragging}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onButtonClick={() => inputRef?.current?.click()}
                            onAreaClick={() => inputRef?.current?.click()}
                            customTrigger={customTrigger}
                        />
                    )
                )}
            </div>

            <input
                type="file"
                ref={inputRef}
                hidden
                accept={getAcceptedFormats()}
                multiple={multiple}
                onChange={handleFileChange}
            />
        </div>
    );
};

interface FileMapperProps {
    imageAssets: (File | string)[];
    setImageAssets?: React.Dispatch<React.SetStateAction<(File | string)[]>>;
    readonly?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    multiple?: boolean;
    pdfPagesToShow?: number;
    customImage?: string;
    customImageSize?: string;
    showIcon?: boolean;
}

export const FileMapper: React.FC<FileMapperProps> = ({
    imageAssets,
    setImageAssets,
    readonly,
    inputRef,
    multiple,
    pdfPagesToShow,
    customImage = "rounded-lg",
    customImageSize = "max-h-[450px]",
    showIcon = false,
}) => {
    const [numPages, setNumPages] = useState<number>(0);

    const { isMobile } = useMobile();

    const handleDelete = (file: File | string) => {
        const updatedImages = imageAssets.filter((item) => item !== file);
        setImageAssets && setImageAssets(updatedImages);
    };

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div className={`flex flex-wrap items-center w-full gap-5   `}>
            {imageAssets?.map((file, id) => (
                <div className={`relative ${customImageSize}`} key={id}>
                    {typeof file === "string" ? (
                        isVideo({ url: file }) ? (
                            <video
                                controls
                                className={`h-fit w-full rounded-md object-cover max-h-[450px] ${customImageSize}`}
                            >
                                <source src={`${file}?${Date.now()}`} />
                            </video>
                        ) : isPdf({ url: file }) ? (
                            <PDFViewer
                                pagesToShow={
                                    pdfPagesToShow ? pdfPagesToShow : null
                                }
                                resumeUrl={file}
                                scale={isMobile ? 0.55 : 1.22}
                            />
                        ) : (
                            <img
                                src={`${file}?${Date.now()}`}
                                className={`rounded-md object-fill ${customImageSize}`}
                                alt="Image File"
                                loading="lazy"
                            />
                        )
                    ) : isBinaryVideo({ file }) ? (
                        showIcon ? (
                            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100">
                                <Icon
                                    icon={icons?.video}
                                    className="size-6 text-gray-600"
                                />
                            </div>
                        ) : (
                            <video
                                controls
                                className="h-fit w-full rounded-md object-cover max-h-[450px]"
                            >
                                <source src={URL.createObjectURL(file)} />
                            </video>
                        )
                    ) : isFileIsPdf(file) ? (
                        showIcon ? (
                            <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100">
                                <Icon
                                    icon={icons?.document}
                                    className="size-6 text-gray-600"
                                />
                            </div>
                        ) : (
                            <ScrollShadow hideScrollBar className=" " size={0}>
                                <Document
                                    file={file}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className={
                                        "h-fit w-full rounded-md object-cover max-w-[150px] max-h-[150px]"
                                    }
                                >
                                    {Array.from(
                                        { length: numPages },
                                        (_, i) => i + 1
                                    ).map((page) => (
                                        <Page
                                            key={page}
                                            pageNumber={page}
                                            renderAnnotationLayer={false}
                                            renderTextLayer={false}
                                        />
                                    ))}
                                </Document>
                            </ScrollShadow>
                        )
                    ) : showIcon ? (
                        <div className="flex items-center justify-center h-16 w-16 rounded-md bg-gray-100">
                            <Icon
                                icon={icons?.img}
                                className="size-6 text-gray-600"
                            />
                        </div>
                    ) : (
                        <img
                            src={URL.createObjectURL(file)}
                            className={`${customImage} ${customImageSize} size-20 object-cover border border-stone-200`}
                            alt="File"
                            loading="lazy"
                        />
                    )}

                    {!readonly && (
                        <div className="absolute -top-2 -right-2 z-10">
                            <button
                                className="text-black bg-white border border-stone-200 shadow-xl rounded-full p-1 cursor-pointer"
                                onClick={() => handleDelete(file)}
                                type="button"
                            >
                                <Icon
                                    icon={"codex:cross"}
                                    className="h-4 w-4"
                                />
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {!readonly && multiple && (
                <div className="flex flex-col gap-2 items-center">
                    <PlusIcon
                        className="size-8 text-main-blue black-gradient text-white p-2 rounded-full cursor-pointer"
                        onClick={() => inputRef?.current?.click()}
                    />
                    <p className="text-xs">Add More</p>
                </div>
            )}
        </div>
    );
};

export default FileUploader;
