import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../../Storage/Slices/cartSlice";
import ReactStars from "react-rating-stars-component";

const CartCard = (course) => {
  const dispatch = useDispatch();

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const removeHandler = () => {
    dispatch(removeItemFromCart(course));
  };
  return (
    <div className="text-richblack-5  border-richblack-600  ">
      <div className="flex flex-col  md:flex-row justify-around md:border-none  border-2 border-richblack-700 py-3">
        {/* course details container  */}

        <div className="flex flex-col w-[90%] sm:w-[80%]  md:flex-row gap-5 md:w-[55%]  mx-auto lg:mx-0 items-center">
          {/* card img */}
          <img src={course?.thumbnail} className=" h-52  md:h-28 rounded-md " />
          <div className="flex flex-col gap-1">
            <div className="  font-inter text-richblack-5">{course.name}</div>
            <div className="text-richblack-200 text-sm">
              {course?.category?.name}
            </div>
            <div>
              <ReactStars
                count={5}
                value={course?.RatingAndReviews?.length}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                fullIcon={<FaStar />}
              />
              <div>{course?.RatingAndReviews?.length} Ratings</div>
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
            Rs. {course?.price}
          </div>
        </div>
      </div>

      <div className="  border border-richblack-700 my-5"></div>
    </div>
  );
};

export default CartCard;
