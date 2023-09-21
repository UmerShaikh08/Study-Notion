import { Router } from "express";
import {
  capturePayment,
  paymentSuccessfull,
  verifyPaymentSignature,
} from "../controller/payment.js";
import { auth, isStudent } from "../middleware/auth.js";

const paymentRoutes = Router();

paymentRoutes.post("/capturePayment", auth, isStudent, capturePayment);
paymentRoutes.post("/payment-successfull", auth, isStudent, paymentSuccessfull);
paymentRoutes.post(
  "/verifyingSignature",
  auth,
  isStudent,
  verifyPaymentSignature
);

export { paymentRoutes };
