import { OTP } from "../model/OTP.js";
import { User } from "../model/User.js";
import { Profile } from "../model/Profile.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

const sendOtp = (req, res) => {
  try {
    const { email } = req.body;
    const checkUserPresent = User.findOne({ email: email });

    // check user already present or not
    if (checkUserPresent) {
      res.status(401).json({
        success: false,
        massage: "User already registered",
      });
    }

    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // check otp unique or not
    let result = OTP.findOne({ otp: otp });
    // create unique otp to checking in OTP model Db
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = OTP.findOne({ otp: otp });
    }

    // create entry in db for otp
    const otpBody = OTP.create({
      email,
      otp,
    });

    console.log(otpBody);

    return res.status(200).json({
      success: true,
      massage: "OTP sent Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      massage: error.massage,
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
      !otp ||
      !contactNumber
    ) {
      res.status(403).json({
        success: false,
        massaage: "All fields are required",
      });
    }

    // validate password same or not
    if (password !== confirmPassword) {
      res.status(403).json({
        success: false,
        massaage: "password and confirm password does not match",
      });
    }

    // check user registered or not
    const checkUserPresent = User.findOne({ email: email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        massage: "User already registered",
      });
    }

    // taking last recently otp from db
    const checkOtp = await OTP.findOne({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);

    // validate otp same or not
    if (otp !== checkOtp) {
      res.status(400).json({
        success: false,
        massage: "otp not matched",
      });
    }

    // hashing password
    let hashPassword = await bcrypt.hash(password, 10);

    // creating entry of profile and linking to user.addtionalDetails
    const profile = Profile.create({
      gender: null,
      contactNumber: null,
      dataOfBirth: null,
      about: null,
    });

    // create entry in db
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType,
      additionalDetails: profile._id,
      img: `api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      data: user,
      massage: "User is registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
      res.status(400).json({
        success: false,
        massage: "All fields are required. Please try again",
      });
    }

    // finding object of email
    const user = User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        massage: "Please signUp first",
      });
    }
    // add role in token
    const payload = {
      eamil: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    // generate JWT token after matching password
    if (await bcrypt.compare(user.password, password)) {
      //creating token
      const token = JWT.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      user.toObject();
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // adding token in cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        massage: "login successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        massage: "password is incorrect",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "You cannot login. Please try again",
    });
  }
};

export { sendOtp, signUp, logIn };
