import React, { useState } from "react";
import frame from "../assets/Images/frame.png";
import loginPage from "../assets/Images/login.webp";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbCornerDownRightDouble } from "react-icons/tb";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../Redux/Slices/authSlice";

// backend call
import { login } from "../services/operations/auth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(true);

  const { loading } = useSelector((store) => store.auth);

  const submitDetails = async (data) => {
    await dispatch(login(data, navigate));
  };
  return (
    <>
      <div
        className={`${
          showDemo ? "" : "hidden"
        } justify-center items-center absolute bg-richblack-400 top-52 md:top-32 md:right-[50%] right-[10%] p-6 -rotate-[20deg] z-20 `}
      >
        <div className="flex flex-col gap-2 relative">
          <div
            onClick={() => {
              setShowDemo(false);
            }}
            className="absolute top-[-30px] right-[-20px] text-5xl text-richblack-900 rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="20"
              height="20"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="#888888"
                stroke="#000000"
                strokeWidth="2"
              />
              <circle cx="50" cy="50" r="20" fill="#ffffff" />
            </svg>
          </div>
          <div className=" gap-y-2 flex flex-col">
            <p className="text-2xl font-extrabold text-richblack-5 flex items-center">
              Take a Demo &nbsp; <BsLightningChargeFill size={20} />
            </p>
            <div>
              <button
                disabled={loading}
                onClick={() => {
                  const data = {
                    password: "Pass@123",
                    email: "umershaikh10000@gmail.com",
                  };
                  dispatch(login(data, navigate));
                }}
                className="bg-yellow-100 font-semibold mt-4 mb-1 text-richblack-900 px-4 py-2 rounded-md flex"
              >
                <TbCornerDownRightDouble className="text-2xl text-richblack-900 hidden md:block" />
                Click here for Instructor Demo
              </button>
            </div>
            <div>
              <button
                disabled={loading}
                onClick={() => {
                  const data = {
                    password: "123456",
                    email: "umershaikh8805@gmail.com",
                  };
                  dispatch(login(data, navigate));
                }}
                className="bg-yellow-100 font-semibold text-richblack-900 px-4 py-2 rounded-md flex"
              >
                <TbCornerDownRightDouble className="text-2xl text-richblack-900 md:block hidden" />
                Click here for Student Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 max-w-maxContent flex flex-col-reverse md:flex-row items-center my-auto gap-20 mb-10">
        <div className=" w-11/12 max-w-[450px] font-inter text-richblack-5 flex flex-col  lg:gap-10 mx-auto ">
          <div className="flex flex-col gap-3">
            <div className="text-richblack-5 text-3xl font-semibold ">
              Welcome Back
            </div>
            <div>
              <div className="text-richblack-300 text-lg">
                Build skills for today, tomorrow, and beyond.
              </div>
              <div className="font-edu-sa  italic text-blue-100 ">
                Education to future-proof your career.
              </div>
            </div>
          </div>
          <form
            className="flex flex-col gap-8` gap-8 mt-5"
            onSubmit={handleSubmit(submitDetails)}
          >
            <div className="flex flex-col ">
              <label htmlFor="email">
                {" "}
                Email Address <span className="text-red-200">*</span>
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                {...register("email")}
                placeholder="Enter email address"
                className="w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              ></input>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">
                Password <span className="text-red-200">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password")}
                required
                placeholder="Enter Password"
                autoComplete="off"
                className="w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none"
              ></input>
              <Link to={"/forgot-password"}>
                {" "}
                <div className="text-sm text-right text-blue-200">
                  forgot password
                </div>{" "}
              </Link>
            </div>

            <button
              className="bg-yellow-50 text-black py-2  rounded-md "
              disabled={loading}
            >
              Sing In
            </button>
          </form>
        </div>
        <div className="relative mt-7 ml-9">
          <img
            className="absolute bottom-4 right-5 lg:w-[400px] "
            loading="lazy"
            src={loginPage}
            alt="login img"
          />
          <img className="w-[400px]" alt="frame img" src={frame} />
        </div>
      </div>
    </>
  );
};

export default Login;
