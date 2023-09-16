import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { generatePasswordToken } from "../services/operations/auth";
import Loader from "../components/common/Loader";

const ForgotPassword = () => {
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(generatePasswordToken(email, setEmailSend));
  };
  return loading ? (
    <Loader />
  ) : (
    <div className=" w-[80%]  sm:w-[50%] md:w-[38%] lg:w-[28%] flex flex-col mx-auto my-auto text-richblack-5 font-inter gap-5">
      <h1 className="text-3xl font-bold">
        {!emailSend ? "Reset your password" : "Check email"}
      </h1>
      <p className="text-richblack-200">
        {!emailSend
          ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
          : `We have sent the reset email to ${email}`}
      </p>

      {!emailSend && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <label htmlFor="email" className="text-richblack-25">
            {" "}
            Email Address <span className="text-red-200">*</span>
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter email address"
            className="w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button
            type="submit"
            className="bg-yellow-50 text-black py-2  rounded-md "
          >
            {!emailSend ? "Reset Password" : ""}
          </button>
        </form>
      )}

      {emailSend && (
        <button
          type="submit"
          className="bg-yellow-50 text-black py-2  rounded-md "
          onClick={() => {
            setEmailSend(false);
          }}
        >
          {" "}
          Resend Email
        </button>
      )}

      <Link to={"/login"}>
        <div className="flex flex-row items-center gap-2 hover:text-yellow-50">
          <BsArrowLeft />
          Back to login
        </div>
      </Link>
    </div>
  );
};

export default ForgotPassword;
