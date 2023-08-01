import { mailSender } from "../utils/mailSender.js";

const contactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, massage, userId } = req.body;

    const sendToStudyNotion = await mailSender(
      "umershaikh10000@gmail.com",
      `<h1>User name ${firstName}  ${lastName} massage :- ${massage} </h1> `,
      help
    );

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
    return res.status(400).json({
      success: false,
      massage: "error occured while user contacting to study notion ",
    });
  }
};

export { contactUs };
