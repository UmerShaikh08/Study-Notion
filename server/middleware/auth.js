import dotenv from "dotenv";
import Jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorisation").replace("Bearer", "");

    if (!token) {
      res.status(400).json({
        success: false,
        massage: "token not found",
      });
    }

    const decode = Jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "Something went wrong when verifying token",
    });
  }
};

const isStudent = (req, res, next) => {
  try {
    const { user } = req.body;
    console.log(user);

    if (user.accountType !== "student") {
      res.status(400).json({
        success: false,
        massage: "this site is protected for student",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "User role is not matching",
    });
  }
};

const isInstructor = (req, res, next) => {
  try {
    const { user } = req.body;

    if (user.accountType !== "Instructor") {
      res.status(400).json({
        success: false,
        massage: "this site is protected for Instructor",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "User role is not matching",
    });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { user } = req.body;

    if (user.accountType !== "admin") {
      res.status(400).json({
        success: false,
        massage: "this site is protected for Admin",
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "User role is not matching",
    });
  }
};

export { auth, isStudent, isInstructor, isAdmin };
