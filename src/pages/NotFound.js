import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" h-[calc(100vh-3.5rem)] w-full flex flex-col justify-center items-center bg-richblack-800 ">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <Link to="/">
        {" "}
        <button className="mt-5">
          <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              Go Home
            </span>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
