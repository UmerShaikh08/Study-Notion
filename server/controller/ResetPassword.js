import { User } from "../model/User.js";
import crypto from "crypto";
import { mailSender } from "../utils/mailSender.js";
import bcrypt from "bcrypt";
import { Profile } from "../model/Profile.js";

// forget password   or create reset password token and send to user mail
const CreateResetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    // validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        massage: "please fill the bracket",
      });
    }

    // get user from db using email
    const user = await User.findOne({ email: email });
    // validate user
    if (!user) {
      return res.status(400).json({
        success: false,
        massage: "please enter valid email",
      });
    }

    // create token
    const token = await crypto.generateUUID();

    const addToken = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: 5 * 60 * 1000 },
      { new: true }
    );
    console.log("Details ", addToken);

    const url = `http://localhost:3000/update-password/${token}`;
    const send = mailSender(
      email,
      "Reset password link",
      `Reset password link :- ${url}`
    );

    return res.status(200).json({
      success: true,
      massage: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "Something went wrong  while reset",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    // get data
    const { password, confirmPassword, token } = res.body;

    // check password same or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        massage: "password not matching",
      });
    }

    // get user from db using token
    const userDetails = await User.fintOne({ token: token });

    // check user present or not based on token
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        massage: "Token is invalid",
      });
    }

    // check date is expired or not
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        massage: "Token is expired. Regenerate  token",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // update password in db
    const updatePassword = await User.findOneAndUpdate(
      { token: token },
      { password: hashPassword },
      { new: true }
    );
    console.log("password updated --> ", updatePassword);

    // send response
    return res.status(200).json({
      success: true,
      massage: "password reset successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "Something went wrong during reset password",
    });
  }
};

export { CreateResetPasswordToken, resetPassword };
