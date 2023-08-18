import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LiaEdit } from "react-icons/lia";

const MyProfile = () => {
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );

  return (
    <div className="flex flex-col gap-3 ">
      <h1 className="text-3xl font-medium font-inter text-white">My Profile</h1>

      {/* user name and user email  */}
      <div className="  flex  md:justify-between flex-col  md:flex-row  bg-richblack-800 p-10 rounded-md shadow-sm shadow-richblack-500">
        <div className="flex flex-row items-center gap-6">
          <img src={user?.img} className="max-h-20 max-w-20 rounded-full" />
          <div className="flex flex-col">
            <h1 className="font-bold text-lg text-richblack-5">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-richblack-200 text-sm">{user?.email}</p>
          </div>
        </div>
        <div className=" mr-0 ml-auto">
          <button className="flex items-center bg-yellow-100 gap-3 transition-all duration-150 font-medium py-2 px-5 rounded-lg text-lg text-richblack-900 hover:scale-95 ">
            Edit
            <LiaEdit />
          </button>
        </div>
      </div>

      {/* user about details  */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-richblack-800 p-10 rounded-md shadow-sm shadow-richblack-500">
        <div className=" w-[90%] lg:w-[70%]  ">
          <div className="font-bold text-lg text-richblack-5 mb-3">About</div>
          <div className="text-richblack-200 text-sm">
            {!user?.additionalDetails?.about
              ? "Write Something About Yourself"
              : user?.additionalDetails?.about}
          </div>
        </div>
        <div className=" mx-auto lg:mx-0">
          <button className="flex items-center bg-yellow-100 gap-3 transition-all duration-150 font-medium py-2 px-5 rounded-lg text-lg text-richblack-900 hover:scale-95 ">
            Edit
            <LiaEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
