import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import { courseRoutes } from "./routes/course.js";
import { profileRoutes } from "./routes/profile.js";
import { paymentRoutes } from "./routes/payments.js";
import { userRoutes } from "./routes/user.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import { connectCloudinary } from "./config/cloudinary.js";
import { ContactUs } from "./routes/contactUs.js";

dotenv.config({ path: ".env" });

const app = express();

connectCloudinary();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://study-notion-ed-tech-project.vercel.app",
      "study-notion-ed-tech-project.vercel.app",
    ],
    credential: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/vi/course", courseRoutes);
app.use("/api/vi/profile", profileRoutes);
app.use("/api/vi/payment", paymentRoutes);
app.use("/api/vi/auth", userRoutes);
app.use("/api/vi/Contact", ContactUs);

app.get("/", (req, res) => {
  res.json({
    success: true,
    massage: "Your server is up and running...",
  });
});

app.listen(process.env.PORT || "4000", () => {
  console.log("server run successfully");
});

// db connect
connectDB();
