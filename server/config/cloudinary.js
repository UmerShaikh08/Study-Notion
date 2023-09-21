import { config } from "cloudinary";
import dotenv from "dotenv";

const connectCloudinary = () => {
  dotenv.config({ path: ".env" });

  try {
    config({
      cloud_name: process.env.NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};

export { connectCloudinary };
