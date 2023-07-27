import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

export { instance };
