import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../../services/operations/payment";

const CourseBuyCard = ({ course }) => {
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseId = useParams();

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  const handleBuyCourse = async () => {
    const result = await buyCourse(user, [courseId], navigate, dispatch, token);
  };
  return (
    <>
      {/* buy card */}
      <div className="mx-auto md:absolute top-[0%] right-0 flex flex-col gap-3 p-3 md:bg-richblack-700 rounded-md w-[90%] sm:w-[70%]  md:w-[35%]">
        <img
          src={course?.thumbnail}
          className="w-[100%]  hidden md:block rounded-md self-center min-h-[180px] max-h-[300px] object-cover"
        />
        <h1 className="text-3xl font-bold  border-b border-richblack-600 pb-2 md:pb-0">
          Rs.{course?.price}
        </h1>
        <button
          onClick={handleBuyCourse}
          className="bg-yellow-100 py-2   text-richblack-900 font-semibold rounded-md transition-all duration-200  hover:scale-95 "
        >
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
        <div className="flex flex-col">
          {course?.requirements.map((instruction, idx) => (
            <div className="hidden md:flex flex-row  items-center text-gradientGreen-200">
              <AiFillCaretRight key={idx} /> {instruction}
            </div>
          ))}
        </div>

        <div
          onClick={handleShare}
          className="flex flex-row gap-2 text-lg items-center cursor-pointer  text-yellow-50 mx-auto"
        >
          <FaRegShareSquare /> <p>Share</p>
        </div>
      </div>
    </>
  );
};

export default CourseBuyCard;
