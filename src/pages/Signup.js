import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// images and icons
import signupImg from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

// backend call
import { sendOtp } from "../services/operations/auth";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setSignup } from "../Redux/Slices/authSlice";

// custom hook
import { isStrongPassword } from "../custom hooks/useStrongPassoword";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState(process.env.REACT_APP_STUDENT);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitDetails = (data) => {
    data.accountType = userType;

    if (!isStrongPassword(data.password)) {
      return;
    }

    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Password Not Match");
      return;
    }
    dispatch(setSignup(data));
    dispatch(sendOtp(data, navigate));

    console.log(data);
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="w-11/12  flex flex-col-reverse md:flex-row items-center mx-auto md:mx-0 gap-20 my-auto">
      <div className=" w-11/12 max-w-[450px]     font-inter text-richblack-5 flex flex-col  mx-auto ">
        <div className="flex flex-col gap-3">
          <div className="text-richblack-5 text-3xl font-semibold ">
            Welcome BackJoin the millions learning to code with StudyNotion for
            free
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
          onSubmit={handleSubmit(submitDetails)}
          className="text-richblack-5 flex flex-col gap-3 mt-5 "
        >
          <div className="flex flex-row bg-richblack-800  max-w-max   gap-6 py-1 px-4 items-center rounded-full  justify-around shadow-richblack-500 shadow-sm transition-all duration-200">
            <div
              className={`cursor-pointer ${
                userType === process.env.REACT_APP_STUDENT
                  ? "bg-richblack-900 rounded-full px-4 py-2 "
                  : ""
              } `}
              onClick={() => {
                setUserType(process.env.REACT_APP_STUDENT);
              }}
            >
              {process.env.REACT_APP_STUDENT}
            </div>
            <div
              className={` cursor-pointer  ${
                userType === process.env.REACT_APP_INSTRUCTOR
                  ? "bg-richblack-900 rounded-full px-4 py-2 "
                  : ""
              } `}
              onClick={() => {
                setUserType(process.env.REACT_APP_INSTRUCTOR);
              }}
            >
              {process.env.REACT_APP_INSTRUCTOR}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-5">
            <div className="flex w-full flex-row gap-7">
              <div className="flex flex-col w-full">
                <label htmlFor="firstName">
                  First Name <span className="text-red-200">*</span>
                </label>
                <input
                  required
                  type="text"
                  id="firstName"
                  name="firstName"
                  {...register("firstName")}
                  placeholder="Enter first name "
                  className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="lastName">
                  Last Name <span className="text-red-200">*</span>
                </label>
                <input
                  required
                  type="text"
                  id="lastName"
                  name="lastName"
                  {...register("lastName")}
                  placeholder="Enter last Name"
                  className="w-full  bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                />
              </div>
            </div>
            <div className="flex w-full flex-col  ">
              <label htmlFor="email">
                Email Address <span className="text-red-200">*</span>
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                {...register("email")}
                placeholder="Enter email address"
                className="w-full pl-3 bg-richblack-700 h-[3rem] rounded-lg  shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
              ></input>
            </div>

            <div className="flex w-full gap-4 flex-col lg:flex-row">
              <div className="relative flex w-full flex-col">
                <label htmlFor="password">
                  Create Password <span className="text-red-200">*</span>
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  {...register("password")}
                  placeholder="Enter Password "
                  className="  w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3  bottom-[15%] bg-transparent text-richblack-5 hover:text-richblack-3 focus:outline-none"
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
              <div className="relative w-full flex flex-col">
                <label htmlFor="confirmPassword">
                  Confirm Password{" "}
                  <span className="hidden sm:inline-block text-red-200">*</span>
                </label>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  {...register("confirmPassword")}
                  placeholder="Enter last Name"
                  className="w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3  bottom-[15%] bg-transparent text-richblack-5 hover:text-richblack-3 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-3  text-gradientGreen-200 ">
              <div className="flex flex-row gap-2">
                <p className="text-richblack-900 bg-gradientGreen-200 rounded-full my-auto h-4  w-4 flex items-center justify-center">
                  ✓
                </p>
                <p>one lowercase character</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-richblack-900 bg-gradientGreen-200 rounded-full my-auto h-4 w-4 flex items-center justify-center">
                  ✓
                </p>
                <p>one special character</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-richblack-900 bg-gradientGreen-200 rounded-full my-auto h-4  w-4 flex items-center justify-center">
                  ✓
                </p>
                <p>one uppercase character</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-richblack-900 bg-gradientGreen-200 rounded-full my-auto h-4  w-4 flex items-center justify-center">
                  ✓
                </p>
                <p>8 character minimum</p>
              </div>
              <div className="flex flex-row gap-2">
                <p className="text-richblack-900 bg-gradientGreen-200 rounded-full my-auto h-4  w-4 flex items-center justify-center">
                  ✓
                </p>
                <p>one number</p>
              </div>
            </div>
            <button
              type="sumbit"
              className=" w-full bg-yellow-50 text-black py-2  rounded-md "
            >
              Sing In
            </button>
          </div>
        </form>
      </div>

      <div className="relative mt-7 ml-9">
        <img
          className="absolute bottom-4 right-5 lg:w-[400px] "
          loading="lazy"
          alt="sign up img"
          src={signupImg}
        />
        <img className="w-[400px]" alt="frame" src={frame} />
      </div>
    </div>
  );
};

export default Signup;
