import React from "react";
import RatingStars from "../../common/RatingStars";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAvgRating } from "../../../utils/avgRating";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeItemFromCart } from "../../../Redux/Slices/cartSlice";

const CartCard = (course) => {
  const dispatch = useDispatch();
  const [avgReviewCount, setAverageReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.data?.RatingAndReviews);
    setAverageReviewCount(count);
  }, [course]);

  const removeHandler = () => {
    dispatch(removeItemFromCart(course.data));
  };

  return (
    <div className="text-richblack-5  border-richblack-600  ">
      <div className="flex flex-col  md:flex-row justify-around md:border-none  border-2 border-richblack-700 py-3">
        {/* course details container  */}

        <div className="flex flex-col w-[90%] sm:w-[80%]  md:flex-row gap-5 md:w-[55%]  mx-auto lg:mx-0 items-center">
          {/* card img */}
          <img
            src={course?.data?.thumbnail}
            className=" h-52  md:h-28 rounded-md "
          />
          <div className="flex flex-col gap-1">
            <div className="  font-inter text-richblack-5">{course?.name}</div>
            <div className="text-richblack-200 text-sm">
              {course?.data?.category?.name}
            </div>
            <div>
              <RatingStars
                Review_Count={avgReviewCount}
                Star_Size={24}
                edit={false}
              />
              <div>{course?.data?.RatingAndReviews?.length} Ratings</div>
            </div>
            <div className="text-richblack-200 text-sm">
              Total Courses • Lesson • Beginner
            </div>
          </div>
        </div>
        <div className="flex items-center mx-auto  sm:flex-col-reverse  md:flex-col gap-3">
          {/* remove button */}
          <div>
            <button
              onClick={removeHandler}
              className="flex flex-row items-center mx-auto  bg-richblack-800 text-red-200 text-lg gap-3 py-2 px-3 rounded-lg transition-all duration-200 hover:scale-95"
            >
              <RiDeleteBin6Line />
              <p>Remove</p>
            </button>
          </div>
          {/* course price */}
          <div className=" text-yellow-50 text-xl font-semibold text-center">
            Rs. {course?.data?.price}
          </div>
        </div>
      </div>

      <div className="  border border-richblack-700 my-5"></div>
    </div>
  );
};

export default CartCard;
