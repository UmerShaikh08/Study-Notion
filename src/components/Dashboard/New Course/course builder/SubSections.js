import React from "react";
import { HiOutlineViewList } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const SubSections = () => {
  return (
    <div className="w-[90%] mx-auto my-2 text-richblack-200 text-[1.2rem] flex flex-row justify-between items-center border-b-2 border-richblack-500 ">
      <div className="flex flex-row items-center ">
        <div className="flex flex-row items-center">
          {" "}
          <AiFillCaretDown /> <HiOutlineViewList />
        </div>
        <div> umer</div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <MdEdit />
        <RiDeleteBin6Line />
        <div className="font-semibold">|</div>
        <AiFillCaretDown />
      </div>
    </div>
  );
};

export default SubSections;
