import { mailSender } from "../utils/mailSender.js";
import dotenv from "dotenv";

const contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, message, phoneNo, countryCode } =
      req.body;

    dotenv.config();
    //console.log("body --->", req.body);
    const sendToStudyNotion = await mailSender(
      process.env.EMAIL_USER,
      `<h1>User name ${firstName}  ${lastName}  </h1> 
       <h6> Phone :- ${countryCode}  ${phoneNo} </h6>
       <h6> Email :- ${email} </h6>
       <p>${message}</p>
      `,
      "help"
    );

    //console.log("done ---> ", sendToStudyNotion);
    const sendToUser = await mailSender(
      email,
      "<h1> thanks to contacting for us</h1>",
      "Study notion"
    );

    return res.status(200).json({
      success: true,
      massage: "email send successfully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while user contacting to study notion ",
    });
  }
};

export { contactUs };
