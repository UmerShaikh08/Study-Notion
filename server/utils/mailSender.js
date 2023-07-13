import nodemailer from "nodemailer";

const mailSender = async (email, body, title) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_PASS,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = transporter.sendMail({
      from: "Study notion || Umer Shaikh",
      To: email,
      subject: title,
      html: body,
    });

    console.log(info);
    return info;
  } catch (error) {
    console.log("problem in mailSender ", error.massage);
    throw error;
  }
};

export { mailSender };
