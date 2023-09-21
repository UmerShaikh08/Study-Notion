import { contactUs } from "../controller/contactUs.js";
import { Router } from "express";

const ContactUs = Router();

ContactUs.post("/contact-us", contactUs);

export { ContactUs };
