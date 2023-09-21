import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import dotenv from "dotenv";
const mailSender = async (email, body, title) => {
  try {
    dotenv.config();
    console.log("i am in mail Sender ");
    console.log(process.env);
    const transporter = await nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("i am in mail Sender ");
    const info = await transporter.sendMail({
      from: "Study Notion",
      to: email,
      subject: title,
      html: body,
    });

    console.log("kjasd", info);
    return info;
  } catch (error) {
    console.log("problem in mailSender ---> ", error);
    throw error;
  }
};

export { mailSender };
