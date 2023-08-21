import React from "react";
import { CTAButton } from "../components/home/Button";
import { Link, useNavigate } from "react-router-dom";
import loginPage from "../assets/Images/login.webp";
import frame from "../assets/Images/frame.png";
import { PiStarOfDavidBold } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/auth";
import { setLoading } from "../Storage/Slices/authSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(setLoading(false));

  const submitDetails = (data) => {
    console.log(data);
    dispatch(login(data, navigate));
  };
  return (
    <div className="w-11/12 max-w-maxContent flex flex-col-reverse md:flex-row items-center my-auto gap-20 ">
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

          <button className="bg-yellow-50 text-black py-2  rounded-md ">
            Sing In
          </button>
        </form>
      </div>
      <div className="relative mt-7 ml-9">
        <img
          className="absolute bottom-4 right-5 lg:w-[400px] "
          loading="lazy"
          src={loginPage}
        />
        <img className="w-[400px]" src={frame} />
      </div>
    </div>
  );
};

export default Login;
