import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Mousewheel } from "swiper/modules";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

const CourseSlider = ({ courses, delayTime }) => {
  console.log(courses);
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
        slidesPerView={1}
        loop={true}
        spaceBetween={30}
        pagination={false}
        modules={[Mousewheel, Keyboard, Autoplay]}
        className="mySwiper md:pt-5"
        autoplay={{
          delay: 1000,
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
        {courses &&
          courses?.map((course) => (
            <SwiperSlide key={course?._id}>
              {" "}
              <Link to={`/course/${course?._id}`}>
                <CourseCard course={course} Height={"h-[250px]"} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default CourseSlider;
