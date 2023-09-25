import { Profile } from "../model/Profile.js";
import { User } from "../model/User.js";
import { imgUploadToCloudinary } from "../utils/imgUploader.js";
import bcrypt from "bcrypt";

const updateProfile = async (req, res) => {
  try {
    // get data
    const {
      dateOfBirt = "",
      contactNumber,
      gender,
      about = "",
      firstName,
      lastName,
    } = req.body;
    //console.log(req.body);
    // get userId from req ,  it added in auth middleware
    // matlab instructor course create karra he use phele log in kiye hoga , login karte waqt middlwear excecute hua hoga or usme hume req ke andar  decode send kiya tha
    const userId = req.user.id;

    // validate data
    if (!contactNumber || !gender || !userId) {
      return res.status(400).json({
        success: false,
        massage: "contact number and gender required",
      });
    }

    // get user and extract profile id from User.additionDetails
    const userDetails = await User.findById(userId);

    // updating first name and last name
    if (firstName && lastName) {
      const updateUserName = await User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
        },
        { new: true }
      );
    }

    const id = userDetails.additionalDetails;

    // update profile based on profile id
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      {
        dateOfBirt,
        contactNumber,
        gender,
        about,
      },
      { new: true }
    );

    // send res
    return res.status(200).json({
      success: true,
      massage: "profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while updating profile",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    // get data
    const { password, confirmPassword } = req.body;
    const userId = req.user.id;

    // check password same or not
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        massage: "password not matching",
      });
    }
    //console.log("password ---> ", password);
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    //console.log("hashpass ---> ", hashPassword);
    // update password in db
    const updatePassword = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true }
    );
    //console.log("password updated --> ", updatePassword);

    // send response
    return res.status(200).json({
      success: true,
      massage: "password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "Something went wrong during update password",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // get id
    const userId = req.user.id;

    // validate id
    if (!userId) {
      return res.status(404).json({
        success: false,
        massage: "user not found",
      });
    }

    // get user details
    const userDetails = await User.findById(userId);
    // exract profile id
    const id = userDetails.additionalDetails;

    // delete profile
    const deletedProfile = await Profile.findByIdAndDelete(id);
    // delete user
    const deleteUser = await User.findByIdAndDelete(userId);

    // send res
    return res.status(200).json({
      success: true,
      massage: "profile deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while deleting  profile",
    });
  }
};

const getUserData = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;

    // get user details
    const UserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec(); // because of populate we get profile data (gender , contacr numberr etc)

    //console.log(UserDetails);
    // send res
    return res.status(200).json({
      success: true,
      massage: "user data fetched successfully",
      UserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while getting all user , profile data",
    });
  }
};

const updateProfileImg = async (req, res) => {
  try {
    // get data
    const file = req.files.image;
    //console.log("file ---> ", file);
    const userId = req.user.id;
    //console.log(userId);
    const options = {
      folder: "Study Notion",
    };
    // upload data
    const response = await imgUploadToCloudinary(file, options);
    //console.log("cloudinary img -->", response);

    const oldUser = await User.findById(userId);
    //console.log("before update url ---->", oldUser?.img);

    // update user
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        img: response.secure_url,
      },
      { new: true }
    );
    //console.log("resoonse ", response?.secure_url);
    //console.log("update url ---->", updateUser?.img);

    // return res
    return res.status(200).json({
      success: true,
      massage: "profile img updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      massage: "error occured while updating profile img",
    });
  }
};

export {
  updateProfile,
  getUserData,
  deleteAccount,
  updateProfileImg,
  updatePassword,
};
