import React from "react";

const BuyCardShimmer = () => {
  return (
    <div className="hidden md:block overflow-hidden w-[30%] relative space-y-5 rounded-2xl bg-richblack-900 border-3 border-richblack-800 bg-gradient-to-r from-transparent via-richblack-800 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-richblack-900 before:bg-gradient-to-r before:from-transparent before:via-richblack-900 before:to-transparent">
      <div className="h-36 rounded-lg bg-richblack-700 "></div>
      <div className="space-y-3">
        <div className="flex flex-row gap-3 items-center ">
          <div className="h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
          <div className="h-5 w-[70%] rounded-md bg-richblack-700"></div>
        </div>
        <div className="h-5 rounded-md bg-richblack-700 w-[40%]"></div>
        <div className="h-5 rounded-md bg-richblack-700 w-[30%]"></div>
        <div className="h-5 rounded-md bg-richblack-700 w-[80%]"></div>
        <div className="h-5 rounded-md bg-richblack-700 w-[80%]"></div>

        <div className="h-5 rounded-md bg-richblack-700 w-[90%]"></div>
        <div className="h-5 rounded-md  bg-richblack-700 w-[100%]"></div>
      </div>
    </div>
  );
};

export default BuyCardShimmer;
