import cloudinary from "cloudinary";

const videoUploader = async (file, folder) => {
  try {
    return await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder,
      resource_type: "auto",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { videoUploader };
