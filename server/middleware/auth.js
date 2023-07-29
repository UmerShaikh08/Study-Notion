import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    dotenv.config();

    // get token
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorisation").replace("Bearer", "");

    // token empty or not
    if (!token) {
      res.status(400).json({
        success: false,
        massage: "token not found",
      });
    }

    console.log(token);

    // extract payload data from token like account type
    const decode = await Jwt.verify(token, "UMER78");
    console.log("decode --> ", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      massage: "Something went wrong while verifying token",
    });
  }
};

const isStudent = (req, res, next) => {
  try {
    const { accountType } = req.user;

    if (accountType !== "Student") {
      res.status(400).json({
        success: false,
        massage: "this site is protected for student",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "User role is not matching with Student",
    });
  }
};

const isInstructor = (req, res, next) => {
  try {
    const { accountType } = req.user;
    console.log(req.user);
    if (accountType !== "Instructor") {
      res.status(400).json({
        success: false,
        massage: "this site is protected for Instructor",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "User role is not matching with Instructor",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { accountType } = req.user;

    console.log(accountType);
    if (accountType !== "Admin") {
      res.status(400).json({
        success: false,
        massage: "this site is protected for Admin",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "User role is not matching with Admin",
    });
  }
};

export { auth, isStudent, isInstructor, isAdmin };
