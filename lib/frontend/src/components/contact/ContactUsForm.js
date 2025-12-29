import React, { useState } from "react";
import Loader from "../common/Loader";
import countryCode from "../../utils/data/countrycode.json";
import { useForm } from "react-hook-form";
import { contactUs } from "../../services/operations/contactUs";

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitData = async (data) => {
    await contactUs(data, setLoading);

    reset({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <form
      onSubmit={handleSubmit(submitData)}
      className="w-full max-w-maxContent flex flex-col gap-5"
    >
      <div className="flex w-full flex-row gap-7">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName">
            First Name <span className="text-red-200">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            {...register("firstName", { required: true })}
            placeholder="Enter first name "
            className=" w-full bg-richblack-700 h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          />
          {errors.firstName && (
            <span className=" text-[12px] text-yellow-100">
              Please enter your First Name
            </span>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="lastName">
            Last Name <span className="text-red-200">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            {...register("lastName", { required: true })}
            placeholder="Enter last Name"
            className="w-full  bg-richblack-700  h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          />
          {errors.lastName && (
            <span className=" text-[12px] text-yellow-100">
              Please enter your Last Name
            </span>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="email">
          Email Address <span className="text-red-200">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          {...register("email", { required: true })}
          placeholder="Enter email address"
          className="w-full pl-3 bg-richblack-700 h-[3rem] rounded-md  shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
        ></input>
        {errors.email && (
          <span className=" text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>
      <div>
        <label htmlFor="lastName">
          Phone Number <span className="text-red-200">*</span>
        </label>

        <div className="flex flex-row gap-4">
          <select
            id="countryCode"
            className="w-[4rem] text-richblack-5 bg-richblack-700 h-[3rem] rounded-md  shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
            {...register("countryCode")}
          >
            {countryCode.map((ele, idx) => {
              return (
                <option key={idx} className="  ">
                  {ele.code}-{ele.country}
                </option>
              );
            })}
          </select>
          <input
            required
            type="number"
            id="phoneNumber"
            name="PhoneNumber"
            placeholder="Enter Phone Number"
            className="w-full  bg-richblack-700 h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your Phone Number.",
              },
              maxLength: { value: 12, message: "Invalid Phone Number" },
              minLength: { value: 10, message: "Invalid Phone Number" },
            })}
          />
        </div>
        {errors.phoneNo && (
          <span className=" text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col ">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          required
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="w-full pl-3 bg-richblack-700 rounded-md  shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className=" text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
          `}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactUsForm;
