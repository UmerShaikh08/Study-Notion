import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { MdLanguage, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { AiFillCaretRight } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { HiOutlineVideoCamera } from "react-icons/hi";
import logo from "../assets/Images/Instructor.png";
import Footer from "../components/common/Footer";

const CoursePage = () => {
  return (
    <div className="bg-richblack-900 w-full text-richblack-5">
      {/* section 1 */}
      <section className="bg-richblack-800 w-full pt-[4rem] mb-[5rem] pb-[5rem]">
        <div className="w-11/12 mx-auto max-w-maxContent ml-0 md:ml-auto ">
          <div className=" flex flex-col md:flex-row relative w-full gap-5 ">
            {/* details of course */}
            <div className="flex flex-col gap-4 w-full  sm:w-[60%] mx-auto  md:mx-0 md:w-[60%] mt-[5rem]">
              <img
                src={logo}
                className="w-[100%]  md:hidden rounded-md self-center min-h-[180px] max-h-[300px] object-cover"
              />
              <h1 className="text-4xl  font-semibold">Python</h1>
              <p className="hidden sm:block text-richblack-300">
                Python is good language
              </p>
              <p className="">(0 reviews) 0 students enrolled</p>
              <p className="md:text-lg">Create By Umer shaikh</p>
              <div className="flex  flex-col md:flex-row gap-3  md:text-lg">
                <div className="flex flex-row items-center  gap-3">
                  <BiErrorCircle className="hidden sm:block" />
                  <p className=""> Created at July 8, 2023 | 3:54 PM</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <MdLanguage />
                  <p>English</p>
                </div>
              </div>
            </div>
            {/* buy card */}
            <div className="mx-auto md:absolute top-[0%] right-0 flex flex-col gap-3 p-3 md:bg-richblack-700 rounded-md w-[90%] sm:w-[70%]  md:w-[35%]">
              <img
                src={logo}
                className="w-[100%]  hidden md:block rounded-md self-center min-h-[180px] max-h-[300px] object-cover"
              />
              <h1 className="text-3xl font-bold  border-b border-richblack-600 pb-2 md:pb-0">
                Rs. 234
              </h1>
              <button className="bg-yellow-100 py-2   text-richblack-900 font-semibold rounded-md transition-all duration-200  hover:scale-95 ">
                By Now
              </button>
              <button className="bg-richblack-800 py-3 font-semibold border-b border-richblack-600   rounded-md transition-all duration-200  hover:scale-95">
                Add to Cart
              </button>

              <p className="hidden md:block md:text-center">
                30-Day Money-Back Guarantee
              </p>
              <h1 className="hidden md:block text-lg font-semibold">
                This Course Includes :
              </h1>
              <div className="hidden md:flex flex-row items-center text-gradientGreen-200">
                <AiFillCaretRight /> Lecture 1
              </div>

              <div className="flex flex-row gap-2 text-lg items-center  text-yellow-50 mx-auto">
                <FaRegShareSquare /> <p>Share</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="mb-6 mx-auto">
        <div className="w-11/12 ml-1 md:mx-auto max-w-maxContent flex flex-col gap-4 ">
          {/* what you will learn */}
          <div className=" border border-richblack-700 py-10 px-4 mx-auto md:mx-0 w-full  sm:w-[80%]  md:w-[60%] flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">What you'll learn</h1>
            <p className="">
              you learn so many things in this course we provide all knowledge
              of pytho
            </p>
          </div>

          {/* Course Content */}
          <div className="flex flex-col mt-4 gap-4  w-full  sm:w-[80%]  md:w-[60%] mx-auto md:mx-0">
            <h1 className="text-4xl font-sembold">Course Content</h1>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col md:flex-row  gap-2">
                <p>1 section(s)</p>
                <p>1 lecture(s)</p>
                <p>14s total length</p>
              </div>
              <div className=" hidden md:block text-yellow-100">
                Collapse all sections
              </div>
            </div>

            {/* lectures table */}
            <div className="border border-richblack-700 w-full">
              <div className="flex flex-row justify-between p-6 bg-richblack-700">
                <div className="flex flex-row items-center gap-1">
                  <IoIosArrowUp />
                  <p>Lecture 1</p>
                </div>
                <div className="hidden md:block">1 lecture(s)</div>
              </div>

              {/* All lectures list */}
              <div className="p-6 flex flex-col gap-2 w-full">
                <div className="flex  flex-row gap-2 items-center">
                  <HiOutlineVideoCamera />
                  <div>python video 1</div>
                </div>
                <div className="flex  flex-row gap-2 items-center">
                  <HiOutlineVideoCamera />
                  <div>python video 1</div>
                </div>
                <div className="flex  flex-row gap-2 items-center">
                  <HiOutlineVideoCamera />
                  <div>python video 1</div>
                </div>
                <div className="flex  flex-row gap-2 items-center">
                  <HiOutlineVideoCamera />
                  <div>python video 1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Author Name  */}
          <div className="flex flex-col gap-3 mt-5">
            <h1 className="text-4xl font-semibold">Author</h1>
            <div className="flex flex-row items-center gap-5">
              <img
                src={logo}
                className="aspect-square w-[78px] rounded-full object-cover"
              />
              <h1 className="text-lg">Umer Shaikh </h1>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default CoursePage;
