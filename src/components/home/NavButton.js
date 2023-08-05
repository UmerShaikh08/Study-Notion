import React from "react";

const NavButton = ({ text }) => {
  return (
    <button
      onClick={() => {
        console.log("h1");
      }}
    >
      <div className="text-richblack-200 font-medium font-inter">{text}</div>
    </button>
  );
};

export default NavButton;
