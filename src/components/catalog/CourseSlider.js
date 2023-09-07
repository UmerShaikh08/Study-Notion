import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

const CourseSlider = ({ courses, delayTime }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: delayTime || 1000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          1024: { slidesPerView: 3 },
        }}
        className=" w-[70%] sm:w-[50%] md:w-[40%] lg:w-[90%]"
      >
        {courses &&
          courses.map((course) => (
            <SwiperSlide key={course._id}>
              {" "}
              <Link to={`/course/${course._id}`}>
                <CourseCard course={course} Height={"h-[250px]"} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default CourseSlider;
