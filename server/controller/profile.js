import { Profile } from "../model/Profile.js";
import { User } from "../model/User.js";
import { imgUploadToCloudinary } from "../utils/imgUploader.js";

const updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirt = "", contactNumber, gender, about = "" } = req.body;

    // get userId from req ,  it added in auth middleware
    // matlab instructor course create karra he use phele log in kiye hoga , login karte waqt middlwear excecute hua hoga or usme hume req ke andar  decode send kiya tha
    const userId = req.user.id;

    // validate data
    if (!contactNumber || !gender || !userId) {
      res.status(400).json({
        success: false,
        massage: "contact number and gender required",
      });
    }

    // get user and extract profile id from User.additionDetails
    const userDetails = await User.findById(userId);
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
    res.status(200).json({
      success: true,
      massage: "profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while updating profile",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // get id
    const userId = req.user.id;

    // validate id
    if (!userId) {
      res.status(404).json({
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
    res.status(200).json({
      success: true,
      massage: "profile deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while deleting  profile",
    });
  }
};

const getAllUserData = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;

    // get user details
    const UserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec(); // because of populate we get profile data (gender , contacr numberr etc)

    console.log(UserDetails);
    // send res
    res.status(200).json({
      success: true,
      massage: "user data fetched successfully",
      UserDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      massage: "error occured while getting all user , profile data",
    });
  }
};

const updateProfileImg = async (req, res) => {
  try {
    // get data
    const file = req.files.displayPicture;
    console.log("file ---> ", file);
    const { userId } = req.body;
    console.log(userId);
    const options = {
      folder: "Study Notion",
    };
    // upload data
    const response = await imgUploadToCloudinary(file, options);
    console.log(response);

    // update user
    const updateUser = await User.findByIdAndUpdate(userId, {
      imgUrl: response.secureUrl,
    });

    // return res
    res.status(200).json({
      success: true,
      massage: "profile img updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      massage: "error occured while updating profile img",
    });
  }
};

export { updateProfile, getAllUserData, deleteAccount, updateProfileImg };
