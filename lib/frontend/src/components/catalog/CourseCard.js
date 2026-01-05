import React, { useMemo } from "react";
import RatingStars from "../common/RatingStars";
import { GetAvgRating } from "../../utils/avgRating";

const CourseCard = React.memo(({ course, Height }) => {
    // Use useMemo to calculate rating only when course data changes
    const avgReviewCount = useMemo(() => {
        if (!course?.RatingAndReviews) return 0;
        return GetAvgRating(course.RatingAndReviews);
    }, [course?.RatingAndReviews]);

    if (!course) return null;

    return (
        <div
            className="z-auto mb-5 md:p-7 lg:w-full transition-transform duration-200 ease-out md:hover:scale-105"
            style={{
                transform: "translateZ(0)",
                willChange: "transform",
                backfaceVisibility: "hidden",
            }}
        >
            <img
                src={`${course?.thumbnail}?format=webp`}
                loading="lazy"
                className={`${Height} w-full rounded-xl object-cover`}
                alt={course?.courseName || "Course thumbnail"}
                style={{
                    transform: "translateZ(0)",
                }}
            />
            <h1 className="text-richblack-5 md:text-lg font-semibold">{course?.courseName}</h1>
            <p className="text-richblack-500">{course?.category?.name}</p>
            <p className="text-richblack-5 ">
                By{" "}
                <span className="text-yellow-100">{`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</span>{" "}
            </p>
            <div className="text-richblack-5 flex flex-wrap gap-2">
                <RatingStars Review_Count={avgReviewCount} />
                {course?.RatingAndReviews?.length > 0 && (
                    <p className="text-yellow-50"> {course?.RatingAndReviews?.length}</p>
                )}
            </div>
            <p className="text-richblack-5">Rs {course?.price}</p>
        </div>
    );
});

CourseCard.displayName = "CourseCard";

export default CourseCard;
