import React from "react";

export const Highlight = ({ text }) => {
  return (
    <>
      {"  "}
      <span className=" font-bold  bg-gradient-to-t from-gradientGreen-200 to-gradientBlue-200 text-transparent bg-clip-text   text-center">
        {text}
      </span>
    </>
  );
};
