import React from "react";

const TimeLineProfile = ({ title, logo, description, index }) => {
  return (
    <>
      <div data-aos="fade-right" className="text-black flex flex-row gap-3">
        <div className="bg-white rounded-full p-3 h-[3.5rem] w-[3.5rem] flex items-center justify-center shadow-sm">
          <img src={logo} alt="logo"></img>
        </div>

        <div>
          <div className="font-semibold">{title}</div>
          <div>{description}</div>
        </div>
      </div>
      {index !== 3 ? (
        <div className="ml-6 m-2 lg:border-l  border-dotted h-[3rem] border-richblack-600"></div>
      ) : (
        ""
      )}
    </>
  );
};

export default TimeLineProfile;
