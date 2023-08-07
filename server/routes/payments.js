import { Router } from "express";
import { capturePayment, verifySignature } from "../controller/payment.js";
import { auth, isStudent } from "../middleware/auth.js";

const paymentRoutes = Router();

paymentRoutes.post("/capturePayment", auth, isStudent, capturePayment);
paymentRoutes.post("/verifyingSignature", verifySignature);

export { paymentRoutes };
