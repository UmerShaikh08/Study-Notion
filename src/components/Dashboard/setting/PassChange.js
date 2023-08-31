import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../services/operations/profile";

const PassChange = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitData = (data) => {
    console.log(data);

    dispatch(updatePassword(data, token));
    reset({ password: "", confirmPassword: "" });
  };
  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="text-richblack-5 flex flex-col gap-8 "
    >
      <div className="text-richblack-5 flex flex-col gap-8 bg-richblack-800 p-10 rounded-md shadow-sm shadow-richblack-500">
        <h1 className="text-xl font-bold">Password</h1>

        {/* password and confirm password */}
        <div className="flex w-full gap-4  lg:flex-row">
          <div className="relative flex w-full flex-col">
            <label htmlFor="password">Create Password</label>
            <input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              {...register("password", { required: true })}
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
            {errors.password && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your Password
              </span>
            )}
          </div>
          <div className="relative w-full flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password </label>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              {...register("confirmPassword", { required: true })}
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
            {errors.confirmpassword && (
              <span className=" text-[12px] text-yellow-100">
                Please enter your Confirm Password
              </span>
            )}
          </div>
        </div>
      </div>

      {/* save and cancel button */}
      <div className="flex justify-end gap-3">
        <Button text={"Cancel"} />
        <Button text={"Update"} active={1} />
      </div>
    </form>
  );
};

export default PassChange;