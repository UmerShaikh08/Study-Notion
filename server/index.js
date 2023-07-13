import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.end("<h1>hello</h1>");
});

app.listen(process.env.PORT || "3000", () => {
  console.log("server run successfully");
});

connectDB();
