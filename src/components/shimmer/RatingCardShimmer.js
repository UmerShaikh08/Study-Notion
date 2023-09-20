import React from "react";
import { AiFillStar } from "react-icons/ai";

const RatingCardShimmer = () => {
  return (
    <div className="flex flex-row">
      <div className="overflow-hidden flex flex-col gap-1 w-full relative space-y-5 rounded-2xl bg-richblack-900 border-3 border-richblack-800 bg-gradient-to-r from-transparent via-richblack-800 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-richblack-900 before:bg-gradient-to-r before:from-transparent before:via-richblack-900 before:to-transparent">
        <div className="flex flex-row gap-1 items-center ">
          <div className="h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
          <div className="h-5 w-[50%] rounded-md bg-richblack-700"></div>
        </div>
        <div className="h-5 w-[70%]  rounded-md bg-richblack-700"></div>

        <div className="flex flex-row gap-2">
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
        </div>
      </div>
      <div className="hidden sm:flex overflow-hidden  flex-col gap-1 w-full relative space-y-5 rounded-2xl bg-richblack-900 border-3 border-richblack-800 bg-gradient-to-r from-transparent via-richblack-800 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-richblack-900 before:bg-gradient-to-r before:from-transparent before:via-richblack-900 before:to-transparent">
        <div className="flex flex-row gap-1 items-center ">
          <div className="h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
          <div className="h-5 w-[50%] rounded-md bg-richblack-700"></div>
        </div>
        <div className="h-5 w-[70%]  rounded-md bg-richblack-700"></div>

        <div className="flex flex-row gap-2">
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
        </div>
      </div>
      <div className=" hidden sm:flex  overflow-hidden  flex-col gap-1 w-full relative space-y-5 rounded-2xl bg-richblack-900 border-3 border-richblack-800 bg-gradient-to-r from-transparent via-richblack-800 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-richblack-900 before:bg-gradient-to-r before:from-transparent before:via-richblack-900 before:to-transparent">
        <div className="flex flex-row gap-1 items-center ">
          <div className="h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
          <div className="h-5 w-[50%] rounded-md bg-richblack-700"></div>
        </div>
        <div className="h-5 w-[70%]  rounded-md bg-richblack-700"></div>

        <div className="flex flex-row gap-2">
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
          <AiFillStar className="text-richblack-700 " size={25} />
        </div>
      </div>
    </div>
  );
};

export default RatingCardShimmer;
