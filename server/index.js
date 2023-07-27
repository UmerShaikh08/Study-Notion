import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import { courseRoutes } from "./routes/course.js";
import { profileRoutes } from "./routes/profile.js";
import { paymentRoutes } from "./routes/payments.js";
import { userRoutes } from "./routes/user.js";
import cor from "cors";
import fileUpload from "express-fileupload";

dotenv.config({ path: ".env" });

const app = express();

// db connect
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cor({
    origin: "http://localhost:3000",
    Credential: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/vi/course", courseRoutes);
app.use("/api/vi/profile", profileRoutes);
app.use("/api/vi/payment", paymentRoutes);
app.use("/api/vi/auth", userRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    massage: "Your server is up and running...",
  });
});

app.listen(process.env.PORT || "4000", () => {
  console.log("server run successfully");
});
