import { OTP } from "../model/OTP.js";
import { User } from "../model/User.js";
import { Profile } from "../model/Profile.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email: email });

    // check user already present or not
    // if (checkUserPresent) {
    //   console.log(checkUserPresent);
    //   return res.status(401).json({
    //     success: false,
    //     massage: "User already registered...",
    //   });
    // }

    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check otp unique or not
    let result = await OTP.findOne({ otp: otp });
    // create unique otp to checking in OTP model Db
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    // create entry in db for otp
    const otpBody = await OTP.create({
      email,
      otp,
    });

    console.log(otpBody);

    return res.status(200).json({
      success: true,
      massage: "OTP sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      massage: "Failed send OTP",
    });
  }
};

const signUp = async (req, res) => {
  try {
    // get data from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      accountType,
      otp,
    } = req.body;

    // validation data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        massage: "All fields are required",
      });
    }

    // validate password same or not
    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        massage: "password and confirm password does not match",
      });
    }

    // check user registered or not
    // const checkUserPresent = await User.findOne({ email: email });
    // if (checkUserPresent) {
    //   return res.status(401).json({
    //     success: false,
    //     massage: "User already registereddd",
    //   });
    // }

    // taking last recently otp from db
    const checkOtp = await OTP.findOne({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (checkOtp == null) {
      return res.status(400).json({
        success: false,
        massage: "otp is expired",
      });
    }

    console.log(otp, "-- > ", checkOtp);
    // validate otp same or not
    if (otp !== checkOtp.otp) {
      return res.status(400).json({
        success: false,
        massage: "otp not matched",
      });
    }

    // hashing password
    let hashPassword = await bcrypt.hash(password, 10);

    // creating entry of profile and linking to user.addtionalDetails
    const profile = await Profile.create({
      contactNumber: null,
      dataOfBirth: null,
      about: null,
    });

    console.log(" profile entery created successfully");
    console.log(
      "my img link ",
      `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
    );
    // create entry in db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType,
      additionalDetails: profile._id,
      img: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    });
    console.log(user.img);

    console.log(user, " user entery created successfully");

    return res.status(200).json({
      success: true,
      data: user,
      massage: "User is registered successfully",
    });
  } catch (error) {
    console.log("User cannot be registered. Please try again");
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: "User cannot be registered. Please try again",
    });
  }
};

const logIn = async (req, res) => {
  try {
    dotenv.config({ path: ".env" });
    //get data from req body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        massage: "All fields are required. Please try again",
      });
    }

    console.log("email -- > ", email);
    console.log("password -- > ", password);
    // finding object of email
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(400).json({
        success: false,
        massage: "Please signUp first",
      });
    }
    console.log("user --- > ", user);
    // add role in token
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };
    console.log("user passwrod -- > ", user.password);
    // generate JWT token after matching password
    if (await bcrypt.compare(password, user.password)) {
      //creating token
      console.log("same password");
      const token = JWT.sign(payload, "UMER78", {
        expiresIn: "72h",
      });

      user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // adding token in cookie
      return res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });

      // return res.status(200).json({
      //   success: true,
      //   user,
      //   token,
      //   massage: "login successfully",
      // });
    } else {
      return res.status(400).json({
        success: false,
        massage: "password is incorrect",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "You cannot login. Please try again",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // get data
    const { newPassword, currentPassword } = req.body;
    const userId = req.user.id;

    // validate data
    if (!newPassword || !currentPassword) {
      return res.status(403).jsos({
        success: false,
        massage: "all fields are required",
      });
    }

    // check current password and new password same or not
    if (newPassword === confirmNewPassword) {
      return res.status(403).json({
        success: false,
        massage: "new password and current password are same",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await Profile.findByIdAndUpdate(userId, {
      password: hashPassword,
    });
    updatePassword.password = null;
    console.log(updatePassword);
    return res.status(200).json({
      success: true,
      massage: "password change successfully",
    });
  } catch (error) {
    return res.status(403).jsos({
      success: false,
      massage: "error occured while changing password",
    });
  }
};

export { sendOtp, signUp, logIn, changePassword };
