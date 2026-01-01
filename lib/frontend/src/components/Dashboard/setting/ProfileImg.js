import React, { useRef, useState } from "react";
import IconBtn from "../IconBtn";
import { AiOutlineUpload } from "react-icons/ai";
import { updateProfileImg } from "../../../services/operations/profile";
import { useDispatch, useSelector } from "react-redux";

const ProfileImg = () => {
    const [image, setImage] = useState("");
    const [uploadedImageKey, setUploadedImageKey] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();
    const selectImg = useRef(null);
    const { token } = useSelector((store) => store.auth);
    const { user, loading: profileLoading } = useSelector((store) => store.profile);

    // Check if file is image
    const isImage = (file) => {
        if (!file) return false;
        const type = file.type || "";
        return type.startsWith("image/");
    };

    // Upload file to S3
    const uploadFileToS3 = async (file) => {
        if (!isImage(file)) {
            console.error("Only images are supported");
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

    const imgClick = () => {
        selectImg.current.click();
    };

    const handleFileChange = async (data) => {
        const file = data?.target?.files[0];
        if (!file) return;

        // Check if file is image
        if (!isImage(file)) {
            alert("Please select an image file");
            return;
        }

        // Set image for preview
        setImage(file);

        // Upload file to S3
        const uploadedKey = await uploadFileToS3(file);
        if (uploadedKey) {
            setUploadedImageKey(uploadedKey);
        } else {
            // If upload failed, clear the image
            setImage("");
            setUploadedImageKey("");
        }
    };

    const uploadImg = () => {
        if (!uploadedImageKey) {
            alert("Please select and wait for image to upload");
            return;
        }

        // Send the S3 key to backend to update profile
        const formData = new FormData();
        formData.append("img", uploadedImageKey);
        dispatch(updateProfileImg(formData, token, user));
    };

    return (
        <div className="text-white bg-richblack-800 p-2 sm:p-10 rounded-md shadow-sm shadow-richblack-500">
            <div className="flex flex-row items-end gap-4">
                <img
                    loading="lazy"
                    src={image ? URL.createObjectURL(image) : user?.img}
                    alt="profile img"
                    className="aspect-square w-[78px] rounded-full object-cover"
                />{" "}
                <div className="flex flex-col gap-2">
                    <div>Change Profile Picture</div>
                    <div className="flex flex-col sm:flex-row gap-2 w-fit">
                        <button
                            onClick={imgClick}
                            className={`flex items-center   gap-3 transition-all duration-150 font-medium py-1 sm:py-2 px-3 sm:px-5 rounded-lg text-lg hover:scale-95 bg-richblack-700 text-richblack-5`}
                        >
                            Select
                        </button>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*,.jpeg,.jpg,.png,.webp"
                            onChange={handleFileChange}
                            ref={selectImg}
                            disabled={isUploading}
                        />
                        <IconBtn
                            onclick={uploadImg}
                            className={`w-fit`}
                            disabled={!uploadedImageKey || isUploading || profileLoading}
                        >
                            {profileLoading || isUploading ? (
                                "Uploading..."
                            ) : (
                                <div className=" flex flex-row gap-3 items-center">
                                    {" "}
                                    Upload <AiOutlineUpload />{" "}
                                </div>
                            )}
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileImg;
