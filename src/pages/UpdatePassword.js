import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/auth";

const UpdatePassword = () => {
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isResetCompleted, setIsResetCompleted] = useState(false);

  const { Loading } = useSelector((store) => store.auth);

  const submitDetails = (data) => {
    const token = location.pathname.split("/").at(-1);
    data.token = token;

    dispatch(resetPassword(data, setIsResetCompleted));
  };

  return isResetCompleted ? (
    <div className="text-richblack-5 w-[80%]  sm:w-[50%] md:w-[38%] lg:w-[28%]  text-inter mx-auto my-auto flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Reset complete!</h1>
      <p className="text-richblack-100">
        All done! We have sent an email to m***********@gmail.com to confirm
      </p>
      <Link to={"/login"}>
        <button className="w-full bg-yellow-50 text-black py-2  rounded-md ">
          Return to login
        </button>
      </Link>
      <Link to={"/login"}>
        <div className="flex flex-row items-center">
          <BsArrowLeft />
          Back to login
        </div>
      </Link>
    </div>
  ) : (
    <div className="text-richblack-5 w-[80%]  sm:w-[50%] md:w-[38%] lg:w-[28%]  text-inter mx-auto my-auto flex flex-col gap-10">
      <h1 className="text-3xl font-semibold">Choose new password</h1>
      <p className="text-richblack-100">
        Almost done. Enter your new password and youre all set.
      </p>
      <form
        onSubmit={handleSubmit(submitDetails)}
        className="flex flex-col gap-10"
      >
        <div>
          <label htmlFor="password" className="text-richblack-25">
            {" "}
            password <span className="text-red-200">*</span>
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            {...register("password")}
            placeholder="Enter password address"
            className="w-full bg-richblack-800 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="text-richblack-25">
            {" "}
            confirmPassword <span className="text-red-200">*</span>
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            {...register("confirmPassword")}
            placeholder="Enter confirmPassword address"
            className="w-full bg-richblack-800 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          ></input>
        </div>
        <button
          type="submit"
          className="bg-yellow-50 text-black py-2  rounded-md "
        >
          Reset Password
        </button>
      </form>
      <Link to={"/login"}>
        <div className="flex flex-row items-center">
          <BsArrowLeft />
          Back to login
        </div>
      </Link>
    </div>
  );
};

export default UpdatePassword;
