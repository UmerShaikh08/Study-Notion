import React from "react";
import RatingStars from "../common/RatingStars";
import RatingCardShimmer from "../shimmer/RatingCardShimmer";
import { useState } from "react";
import { useEffect } from "react";
import { getAllRatingReviews } from "../../services/operations/RatingAndReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const Reviews = () => {
  const [allReview, setAllReview] = useState([]);
  const [shimmer, setShimmer] = useState(true);
  const delayTime = 2000;
  const onlyShow = 15;

  const fetchReview = async () => {
    setShimmer(true);
    const result = await getAllRatingReviews();

    if (result) {
      const reviewList = result.splice(0, onlyShow);
      setAllReview(reviewList);
      setShimmer(false);
    }
  };
  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className="w-11/12 max-w-maxContent mx-auto  flex flex-col gap-6 my-16">
      <h1 className="text-4xl text-center text-richblack-5 font-semibold">
        Reviews from other learners
      </h1>
      <div>
        <div className="h-max-[180px]  text-richblack-5">
          <Swiper
            mousewheel={{
              enabled: true,
              forceToAxis: true,
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            allowSlidePrev={true}
            slidesPerView={1}
            loop={true}
            spaceBetween={20}
            pagination={false}
            modules={[Mousewheel, Keyboard, Autoplay]}
            className="mySwiper md:pt-5"
            autoplay={{
              delay: delayTime || 2000,
              disableOnInteraction: false,
            }}
            style={{
              "--swiper-navigation-size": "20px",
            }}
            freeMode={false}
            rewind={false}
            centeredSlides={true}
            navigation={false}
            breakpoints={{
              300: { slidesPerView: 1.1, spaceBetween: 10 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.1 },
            }}
          >
            {!shimmer && allReview ? (
              allReview?.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className="flex flex-col gap-3 min-h-[150px] bg-richblack-800 p-3 text-[14px] text-richblack-25">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review?.user?.[0]?.img
                            ? review?.user?.[0]?.img
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.[0]?.firstName}%20${review?.user[0].lastName}`
                        }
                        alt="user"
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-semibold text-richblack-5">
                          {review?.user?.[0]?.firstName}{" "}
                          {review?.user[0].lastName}
                        </h3>
                        <p className="text-[12px] font-medium text-richblack-500">
                          {review?.course?.courseName}
                        </p>
                      </div>
                    </div>
                    <div className="font-medium text-richblack-25">
                      {review?.review.slice(0, 70)}...
                    </div>
                    <RatingStars Review_Count={review?.rating} />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <RatingCardShimmer />
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
