import cloudinary from "cloudinary";

const imgUploadToCloudinary = async (file, options) => {
  try {
    return await cloudinary.v2.uploader.upload(file.tempFilePath, options);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { imgUploadToCloudinary };
