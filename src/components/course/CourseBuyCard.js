import copy from "copy-to-clipboard";
import ConfirmationModal from "../common/ConfirmationModal";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { addToCart } from "../../Redux/Slices/cartSlice";
import { buyCourse } from "../../services/operations/payment";
import { AiFillCaretRight } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CourseBuyCard = ({ course }) => {
  const { token } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseId = useParams();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  const handleBuyCourse = async () => {
    // check use instuctor or not
    if (user && user.accountType === process.env.REACT_APP_INSTRUCTOR) {
      toast.error("Instructor dont have permission to buy course");
      return;
    }

    // user is student
    if (token) {
      setLoading(true);
      const result = await buyCourse(
        user,
        [courseId],
        navigate,
        dispatch,
        token
      );
      setLoading(false);
      return;
    }

    // user not loged in
    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  return (
    course && (
      <>
        {/* buy card */}
        <div className=" mx-auto md:absolute top-[0%] right-0 flex flex-col gap-3  p-3 md:bg-richblack-700 rounded-md w-[90%] sm:w-[70%]  md:w-[35%]">
          <img
            src={course?.thumbnail}
            className="w-[100%]  hidden md:block rounded-md self-center min-h-[180px] max-h-[300px] object-cover"
          />
          <h1 className="text-3xl font-bold  border-b border-richblack-600 pb-2 md:pb-0">
            Rs.{course?.price}
          </h1>
          <button
            disabled={loading}
            onClick={
              user && course?.studentsEnrolled?.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            className="bg-yellow-100 py-2   text-richblack-900 font-semibold rounded-md transition-all duration-200  hover:scale-95 "
          >
            {user && course?.studentsEnrolled?.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>
          <button
            onClick={() => {
              if (
                user &&
                user.accountType === process.env.REACT_APP_INSTRUCTOR
              ) {
                toast.error("Instructor dont have permission to buy course");
                return;
              }
              dispatch(addToCart(course));
            }}
            className={`bg-richblack-800 py-3 font-semibold border-b border-richblack-600   rounded-md transition-all duration-200  hover:scale-95 ${
              user && course?.studentsEnrolled?.includes(user?._id)
                ? "hidden"
                : ""
            }`}
          >
            Add to Cart
          </button>

          <p className="hidden md:block md:text-center">
            30-Day Money-Back Guarantee
          </p>
          <h1 className="hidden md:block text-lg font-semibold">
            This Course Includes :
          </h1>
          <div className="flex flex-col">
            {course?.requirements?.map((instruction, idx) => (
              <div
                className="hidden md:flex flex-row  items-center text-gradientGreen-200"
                key={idx}
              >
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

        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </>
    )
  );
};

export default CourseBuyCard;