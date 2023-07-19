import cloudinary from "cloudinary";

const videoUploader = async (req, res) => {
  try {
    const { file, folder } = req.body;

    return await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder,
      resource_type: "auto",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while uploading video on cloudinary",
    });
  }
};

export { videoUploader };
