import { User } from "../model/User.js";
import crypto from "crypto";
import { mailSender } from "../utils/mailSender.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { Profile } from "../model/Profile.js";
import { resetPasswordTemplate } from "../mail/templates/passWordReset.js";

// forget password   or create reset password token and send to user mail
const CreateResetPasswordToken = async (req, res) => {
  try {
    console.log("hi");
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
    const token = await uuid();

    const addToken = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 3600000 },
      { new: true }
    );
    console.log("Details ", addToken);

    const url = `http://localhost:3000/update-password/${token}`;
    const template = resetPasswordTemplate(url);
    const send = mailSender(
      email,

      template,
      "Reset password link"
    );

    return res.status(200).json({
      success: true,
      massage: "password reset token created  successfully",
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
    const { password, confirmPassword, token } = req.body;

    // check password same or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        massage: "password not matching",
      });
    }

    // get user from db using token
    const userDetails = await User.findOne({ token: token });

    // check user present or not based on token
    console.log(token);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        massage: "Token is invalid",
      });
    }

    // check date is expired or not
    if (!(userDetails.resetPasswordExpires > Date.now())) {
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
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "Something went wrong during reset password",
    });
  }
};

export { CreateResetPasswordToken, resetPassword };
