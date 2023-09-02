import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setSignup } from "../Redux/Slices/authSlice";
import { singup } from "../services/operations/auth";
import Loader from "../components/common/Loader";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { signupData, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitData = (data) => {
    data.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      singup(
        {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        },
        navigate
      )
    );
  };
  return loading ? (
    <Loader />
  ) : (
    <div className="text-richblack-5 w-[80%]  sm:w-[50%] md:w-[38%] lg:w-[28%]  text-inter mx-auto my-auto flex flex-col gap-10">
      <h1 className="text-3xl font-semibold">Verify email</h1>
      <p className="text-richblack-100">
        A verification code has been sent to you. Enter the code below
      </p>
      <form className="flex flex-col gap-10" onSubmit={submitData}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="text-richblack-900">- </span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-[48px]  lg:w-[50px] mx-auto border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
            />
          )}
        />
        <button
          type="submit"
          className="bg-yellow-50 text-black py-2  rounded-md "
        >
          Verify email
        </button>
      </form>
      <div>
        <Link to={"/signup"}>
          <div className="flex flex-row items-center">
            <BsArrowLeft />
            Back to signup
          </div>
        </Link>
        <div>resend it</div>
      </div>
    </div>
  );
};

export default Otp;
