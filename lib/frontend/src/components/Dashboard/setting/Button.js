import React from "react";

const Button = ({ text, active }) => {
  return (
    <button
      type="submit"
      className={`flex items-center   gap-3 transition-all duration-150 font-medium py-1 sm:py-2 px-3 sm:px-5 rounded-lg text-lg hover:scale-95 ${
        active
          ? "bg-yellow-100 text-richblack-900"
          : "bg-richblack-700 text-richblack-5"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
