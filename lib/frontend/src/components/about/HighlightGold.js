import React from "react";

const HighlightGold = ({ text }) => {
  return (
    <>
      <span className="inline-block  m-auto  font-bold  bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text  ">
        {text}
      </span>
    </>
  );
};

export default HighlightGold;
