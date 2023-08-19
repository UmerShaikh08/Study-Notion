import React from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";

const ProfileInfo = () => {
  const { register, handleSubmit, reset } = useForm();
  const genders = [
    "Male",
    "Female",
    "Non - Binary",
    "prefer Not to say",
    "Other",
  ];
  return (
    <form className="text-richblack-5 flex flex-col gap-8 bg-richblack-800 p-10 rounded-md shadow-sm shadow-richblack-500">
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
          />
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
          />
        </div>
      </div>

      {/* date of birth and gender */}
      <div className="flex w-full flex-row gap-7">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">Date of Birt</label>
          <input
            required
            type="date"
            id="dob"
            name="dob"
            placeholder="mm/dd/yy"
            className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
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
        </div>
      </div>

      {/* phone nuber and about details */}
      <div className="flex w-full flex-row gap-7">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">Phone Number</label>
          <input
            required
            type="number"
            id="contactNumber"
            name="contactNumber"
            placeholder="Enter Phone Number "
            className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          />
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="lastName">About</label>
          <input
            required
            type="text"
            id="about"
            name="about"
            placeholder="Enter Bio Details"
            className="w-full  bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          />
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
