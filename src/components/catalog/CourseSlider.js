import React from "react";
import CourseCard from "./CourseCard";
import { Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

const CourseSlider = ({ courses, delayTime }) => {
  return (
    <>
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
        slidesPerView={1.1}
        breakpoints={{
          300: { slidesPerView: 2.1, spaceBetween: 10 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        loop={true}
        spaceBetween={20}
        pagination={false}
        freeMode={true}
        rewind={false}
        centeredSlides={false}
        navigation={false}
        className="mySwiper mb-4"
        autoplay={{
          delay: delayTime || 2000,
          disableOnInteraction: false,
        }}
        style={{
          "--swiper-navigation-size": "20px",
        }}
      >
        {courses &&
          courses?.map((course) => (
            <SwiperSlide key={course?._id}>
              {" "}
              <Link to={`/course/${course?._id}`}>
                <CourseCard course={course} Height={"h-[150px] sm:h-[250px]"} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default CourseSlider;
