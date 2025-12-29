import React from "react";
import Loader from "../common/Loader";
import IconBtn from "./IconBtn";
import PersonalDetails from "./PersonalDetails";
import { Link } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );

  const personalDetails = [
    {
      title: "First Name",
      name: user?.firstName ? user?.firstName : "Add First Name",
    },
    {
      title: "Last Name",
      name: user?.lastName ? user?.lastName : "Add Last Name",
    },
    {
      title: "Email",
      name: user?.email ? user?.email : "Add Email",
    },
    {
      title: "Phone Number",
      name: user?.additionalDetails?.contactNumber
        ? user?.additionalDetails?.contactNumber
        : "Add Contact Cumber",
    },
    {
      title: "Gender",
      name: user?.additionalDetails?.gender
        ? user?.additionalDetails?.gender
        : "Add Gender",
    },
    {
      title: "Date Of Birth",
      name: user?.additionalDetails?.dateOfBirth
        ? user?.additionalDetails?.dateOfBirth
        : "Add Date Of Birth",
    },
  ];

  return profileLoading ? (
    <Loader />
  ) : (
    user && (
      <div className="flex flex-col gap-10 ">
        <h1 className="text-3xl font-medium font-inter text-white">
          My Profile
        </h1>

        {/* user name and user email  */}
        <div className="  flex  md:justify-between flex-col  md:flex-row  gap-5 bg-richblack-800 p-2 sm:p-10 rounded-md shadow-sm shadow-richblack-500">
          <div className="flex flex-row items-center sm:gap-6">
            <img
              loading="lazy"
              src={user?.img}
              className="aspect-square  max-w-14 max-h-14  sm:max-h-20  sm:max-w-20    rounded-full"
            />
            <div className="flex flex-col w-full">
              <h1 className="font-bold text-lg text-richblack-5">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-richblack-200 text-sm">{user?.email}</p>
            </div>
          </div>
          <Link to="/dashboard/setting" className="  ml-auto">
            <IconBtn text={"Edit"}>
              <LiaEdit />
            </IconBtn>
          </Link>
        </div>

        {/* user about details  */}
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between bg-richblack-800 p-2 sm:p-10 rounded-md shadow-sm shadow-richblack-500">
          <div className=" w-[90%] lg:w-[70%]  ">
            <div className="font-bold text-lg text-richblack-5 mb-3">About</div>
            <div className="text-richblack-200 text-sm">
              {!user?.additionalDetails?.about
                ? "Write Something About Yourself"
                : user?.additionalDetails?.about}
            </div>
          </div>
          <Link to="/dashboard/setting" className=" ml-auto lg:mx-0">
            <IconBtn text={"Edit"}>
              <LiaEdit />
            </IconBtn>
          </Link>
        </div>

        {/* user personal details */}
        <div className="text-richblack-5  bg-richblack-800 p-2 sm:p-10 rounded-md shadow-sm shadow-richblack-500">
          <div className="flex flex-row justify-between items-center mb-[3rem]">
            <h1 className="font-medium ">Personal Details</h1>
            <Link to="/dashboard/setting">
              <IconBtn text={"Edit"}>
                <LiaEdit />
              </IconBtn>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {personalDetails &&
              personalDetails?.map((ele, idx) => {
                return <PersonalDetails key={idx} {...ele} />;
              })}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
