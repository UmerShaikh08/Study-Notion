import React from "react";
import { Link } from "react-router-dom";

export const CTAButton = ({ children, linkTo, active }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`text-center  mt-9 w-fit  rounded-xl font-bold py-3 px-6   border-[2px] border-richblack-900 transition-all duration-200 hover:scale-95 hover:shadow-none
         ${
           active
             ? "bg-yellow-50 text-black"
             : "bg-richblack-800 text-white shadow-sm shadow-richblue-300"
         }`}
      >
        {children}
      </div>
    </Link>
  );
};
