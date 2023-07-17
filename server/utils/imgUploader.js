import cloudinary from "cloudinary";

const imgUploadToCloudinary = async (file, folder) => {
  try {
    return await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder,
      resource_type: "auto",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while uplading  img on cloudinary",
    });
  }
};

export { imgUploadToCloudinary };
