import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ error, resetErrorBoundary }) => {
  return (
    <main className=" h-screen w-full flex flex-col gap-2 justify-center items-center bg-richblack-800 ">
      <h1 className="text-3xl  font-extrabold text-[#FF6A3D] tracking-widest">
        OOPS, SOMETHING WENT WRONG!!
      </h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded ">{error?.message}</div>{" "}
      <div className="flex flex-row gap-3">
        <Link to={"/"}>
          <button className="mt-5">
            <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
              <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span
                onClick={resetErrorBoundary}
                className="relative block px-8 py-3 bg-[#1A2238] border border-current"
              >
                Go Home
              </span>
            </div>
          </button>
        </Link>
        <button className="mt-5">
          <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span
              onClick={resetErrorBoundary}
              className="relative block px-8 py-3 bg-[#1A2238] border border-current"
            >
              Try Again
            </span>
          </div>
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
