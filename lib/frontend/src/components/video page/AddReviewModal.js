import React, { useEffect } from "react";
import toast from "react-hot-toast";
import IconBtn from "../Dashboard/IconBtn";
import ReactStars from "react-rating-stars-component";
import { ImCross } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { addRatingAndReview } from "../../services/operations/RatingAndReviews";

const AddReviewModal = ({ setReviewModal }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { courseId } = useParams();
  const { user } = useSelector((store) => store.profile);
  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    setValue("review", "");
    setValue("rating", 1);
    setValue("courseId", courseId);
  }, []);

  const handleRating = (newRating) => {
    setValue("rating", newRating);
  };

  const submitReview = async (data) => {
    const result = await addRatingAndReview(data, token);

    if (result) {
      toast.success("added");
    }
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] w-[100vw] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[550px] rounded-lg border border-richblack-700 bg-richblack-800 ">
        {/* add review hading */}
        <div className="text-richblack-5 bg-richblack-700 p-3 w-full border-b border-richblack-300 flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">Add Review </p>
          <ImCross
            onClick={() => setReviewModal(false)}
            className="text-lg cursor-pointer "
          />
        </div>
        <form
          onSubmit={handleSubmit(submitReview)}
          className="w-full flex flex-col gap-3 justify-center mx-auto text-richblack-5 mt-11 mb-5"
        >
          <div className="flex  flex-row  gap-2 text-richblack-5 items-center justify-center ">
            <img
              src={user?.img}
              className="aspect-square w-[58px] rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <p>{`${user?.firstName}  ${user?.lastName}`}</p>
              <p>Posting publicly</p>
            </div>
          </div>
          <div>
            <ReactStars
              count={5}
              size={24}
              value={1}
              onChange={handleRating}
              activeColor="#ffd700"
              classNames={" mx-auto flex justify-center"}
            />
          </div>
          {/* add review  */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5 ml-7" htmlFor="review">
              Lecture Description{" "}
            </label>
            <textarea
              id="review"
              {...register("review", { required: true })}
              placeholder="Enter Lecture Description"
              className=" pt-3 h-[9rem] w-[90%] mx-auto bg-richblack-600  rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 placeholder:text-start "
            />
          </div>
          <div className="flex flex-row  gap-3 justify-end">
            <button
              onClick={() => setReviewModal(false)}
              className="  cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold bg-richblack-700 text-richblack-5 transition-all duration-200 hover:scale-95"
            >
              Cancel
            </button>
            <IconBtn type={"submit"} text={"Save Edits"}></IconBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
