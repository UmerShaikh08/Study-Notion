import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    dotenv.config();

    // get token
    const token =
      req.body.token ||
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    console.log("token---->", token);

    console.log("hi");
    // check token empty or not
    if (!token) {
      return res.status(400).json({
        success: false,
        massage: "token not found",
      });
    }

    // extract payload data from token like account type
    const decode = await Jwt.verify(token, "UMER78");
    console.log("decode --> ", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "Something went wrong while verifying token",
    });
  }
};

const isStudent = (req, res, next) => {
  try {
    const { accountType } = req.user;

    if (accountType !== "Student") {
      return res.status(400).json({
        success: false,
        massage: "this site is protected for student",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
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
      return res.status(400).json({
        success: false,
        massage: "this site is protected for Instructor",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
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
      return res.status(400).json({
        success: false,
        massage: "this site is protected for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      massage: "User role is not matching with Admin",
    });
  }
};

export { auth, isStudent, isInstructor, isAdmin };
