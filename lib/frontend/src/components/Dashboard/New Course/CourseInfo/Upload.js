import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Upload = ({ name, label, register, errors, setValue }) => {
    const [image, setimage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { editCourse, course } = useSelector((state) => state.course);

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

    const handelonchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if file is image or video
        if (!isImageOrVideo(file)) {
            alert("Please select an image or video file");
            return;
        }

        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
            setimage(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload file to S3
        const uploadedKey = await uploadFile(file);
        if (uploadedKey) {
            // Set the uploaded file key/URL in the form
            setValue(name, uploadedKey);
        } else {
            // If upload failed, clear the preview
            setimage(null);
            setValue(name, null);
        }
    };

    useEffect(() => {
        if (editCourse) {
            setimage(course?.thumbnail);
        }
    }, []);

    return (
        <div>
            {image ? (
                <div className="flex flex-col space-y-2">
                    <img src={image} alt="" className="h-full w-full rounded-md object-cover" />
                    <button
                        type="button"
                        onClick={() => {
                            setimage(null);
                            setValue(name, null);
                        }}
                        className="text-sm text-richblack-5"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor={label}>
                        <div>
                            Course Thumbnail <sup className="text-pink-200">*</sup>
                        </div>

                        <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
                            <div className="flex w-full flex-col items-center p-6" role="presentation" tabIndex={0}>
                                <input
                                    id={label}
                                    name={name}
                                    type="file"
                                    accept="image/*,video/*,.jpeg,.jpg,.png,.mp4,.webm"
                                    tabIndex="-1"
                                    {...register(name, { required: true })}
                                    onChange={handelonchange}
                                    disabled={isUploading}
                                    className="hidden"
                                />
                                <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-2xl text-yellow-50"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <polyline points="16 16 12 12 8 16"></polyline>
                                        <line x1="12" y1="12" x2="12" y2="21"></line>
                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                                        <polyline points="16 16 12 12 8 16"></polyline>
                                    </svg>
                                </div>
                                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                    {isUploading ? (
                                        "Uploading..."
                                    ) : (
                                        <>
                                            Drag and drop an image or video, or click to{" "}
                                            <span className="font-semibold text-yellow-50">Browse</span> a file
                                        </>
                                    )}
                                </p>
                                <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>
                            </div>
                        </div>
                    </label>
                    {errors.courseImage && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Course Image is required**</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default Upload;
