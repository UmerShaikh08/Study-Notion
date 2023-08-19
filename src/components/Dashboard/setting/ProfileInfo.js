import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../services/operations/profile";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../Storage/Slices/profileSlice";
import Loader from "../../common/Loader";

const ProfileInfo = () => {
  const { token } = useSelector((store) => store.auth);
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const genders = [
    "Male",
    "Female",
    "Non - Binary",
    "prefer Not to say",
    "Other",
  ];

  const submitData = (data) => {
    console.log(data);

    dispatch(setUser(data));
    dispatch(updateProfile(data, token));
    const updatedUser = {
      ...user, // Copy the existing properties from the user object
      firstName: data?.firstName,
      lastName: data?.lastName,
      additionalDetails: {
        ...user?.additionalDetails, // Copy existing additionalDetails object
        dateOfBirth: data?.dateOfBirth,
        gender: data?.gender,
        contactNumber: data?.contactNumber,
        about: data?.about,
      },
    };

    dispatch(setUser(updatedUser));
  };
  return profileLoading ? (
    <Loader />
  ) : (
    <form
      onSubmit={handleSubmit(submitData)}
      className="text-richblack-5 flex flex-col gap-6 "
    >
      <div className="flex flex-col gap-8 bg-richblack-800 p-10 rounded-md shadow-sm shadow-richblack-500">
        <h1 className="text-xl font-bold">Profile Information</h1>

        {/* first name last name */}
        <div className="flex w-full flex-row gap-7">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName">
              First Name <span className="text-red-200">*</span>
            </label>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name "
              className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your First Name
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="lastName">
              Last Name <span className="text-red-200">*</span>
            </label>
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last Name"
              className="w-full  bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your last name
              </span>
            )}
          </div>
        </div>

        {/* date of birth and gender */}
        <div className="flex w-full flex-row gap-7">
          <div className="flex flex-col w-full">
            <label htmlFor="dateOfBirth">Date of Birt</label>
            <input
              required
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="mm/dd/yy"
              className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your date of birth
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              {...register("gender", { required: true })}
            >
              {genders.map((ele, idx) => {
                return (
                  <option key={idx} id="gender">
                    {" "}
                    {ele}
                  </option>
                );
              })}
            </select>
            {errors.dob && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your gender
              </span>
            )}
          </div>
        </div>

        {/* phone nuber and about details */}
        <div className="flex w-full flex-row gap-7">
          <div className="flex flex-col w-full">
            <label htmlFor="contactNumber">Phone Number</label>
            <input
              required
              type="number"
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter Phone Number "
              className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              {...register("contactNumber", { required: true })}
            />{" "}
            {errors.contactNumber && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your Phone Number
              </span>
            )}
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="about">About</label>
            <input
              required
              type="text"
              id="about"
              name="about"
              placeholder="Enter Bio Details"
              className="w-full  bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              {...register("about", { required: true })}
            />
            {errors.about && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your about
              </span>
            )}
          </div>
        </div>
      </div>
      {/* save and cancel button */}
      <div className="flex justify-end gap-3">
        <Button text={"Cancel"} />
        <Button text={"Update"} active={1} />
      </div>
    </form>
  );
};

export default ProfileInfo;
