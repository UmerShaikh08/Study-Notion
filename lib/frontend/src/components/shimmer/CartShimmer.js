import React from "react";

const CartShimmer = () => {
  return (
    <div className=" flex flex-col md:flex-row gap-1 justify-between   w-full overflow-hidden  relative space-y-5 rounded-2xl bg-richblack-900 border-3 border-richblack-800 bg-gradient-to-r from-transparent via-richblack-800 to-transparent p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-richblack-900 before:bg-gradient-to-r before:from-transparent before:via-richblack-900 before:to-transparent">
      <div className="w-full flex flex-col gap-10 md:gap-5">
        <div className="w-full  flex flex-col md:flex-row gap-5">
          <div className="w-[90%] md:w-[50%] h-36 rounded-md bg-richblack-700 "></div>
          <div className=" w-full space-y-3">
            <div className="w-[90%] md:w-[50%]  flex flex-row gap-3 items-center ">
              <div className=" h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
              <div className="w-[70%] h-5  rounded-md bg-richblack-700"></div>
            </div>
            <div className="w-[70%] h-5 rounded-md bg-richblack-700"></div>
            <div className="w-[70%] h-5 rounded-md bg-richblack-700"></div>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-5">
          <div className="w-[90%] md:w-[50%] h-36 rounded-md bg-richblack-700 "></div>
          <div className=" w-full space-y-3">
            <div className="w-[90%] md:w-[50%]  flex flex-row gap-3 items-center ">
              <div className=" h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
              <div className="w-[70%] h-5  rounded-md bg-richblack-700"></div>
            </div>
            <div className="w-[70%] h-5 rounded-md bg-richblack-700"></div>
            <div className="w-[70%] h-5 rounded-md bg-richblack-700"></div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-5">
          <div className="w-[90%] md:w-[50%] h-36 rounded-md bg-richblack-700 "></div>
          <div className=" w-full space-y-3">
            <div className="w-[90%] md:w-[50%]  flex flex-row gap-3 items-center ">
              <div className=" h-[3rem] w-[3rem] rounded-full bg-richblack-700"></div>
              <div className="w-[70%] h-5  rounded-md bg-richblack-700"></div>
            </div>
            <div className="w-[70%] h-5 rounded-md bg-richblack-700"></div>
            <div className="w-[70%] h-5 rounded-md bg-richblack-700"></div>
          </div>
        </div>
      </div>

      <div className="w-[40%] h-36  rounded-md bg-richblack-700 "></div>
    </div>
  );
};

export default CartShimmer;
