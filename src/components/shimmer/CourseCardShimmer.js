import React from "react";

const CourseCardShimmer = () => {
  return (
    <div class="overflow-hidden w-full relative space-y-5 rounded-2xl bg-richblack-900 border-3 border-richblack-800 bg-gradient-to-r from-transparent via-richblack-800 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-richblack-900 before:bg-gradient-to-r before:from-transparent before:via-richblack-900 before:to-transparent">
      <div class="h-36 rounded-lg bg-richblack-800 bg-gray-600"></div>
      <div class="space-y-3">
        <div className="flex flex-row gap-3 items-center ">
          <div class="h-[3rem] w-[3rem] rounded-full bg-richblack-800"></div>
          <div class="h-5 w-[70%] rounded-md bg-richblack-800"></div>
        </div>
        <div class="h-5 rounded-lg bg-richblack-800"></div>
        <div class="h-5 rounded-lg bg-richblack-800"></div>
      </div>
    </div>
  );
};

export default CourseCardShimmer;
