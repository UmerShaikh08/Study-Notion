import React from "react";

const Our = ({ heading, description1, description2, color }) => {
  return (
    <div className="flex flex-col gap-10 w-[90%] lg:w-[47%]">
      <h1
        className={`text-4xl    font-bold  bg-gradient-to-br  ${color} text-transparent bg-clip-text `}
      >
        {heading}{" "}
      </h1>
      <p className="text-richblack-300">{description1}</p>
      {description2 ? <p className="text-richblack-300">{description2}</p> : ""}
    </div>
  );
};

export default Our;
