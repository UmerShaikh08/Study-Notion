import React, { useMemo } from "react";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const CourseSlider = React.memo(({ courses, delayTime }) => {
    const courseSlides = useMemo(() => {
        if (!courses || courses.length === 0) return null;

        return courses.map((course) => (
            <SwiperSlide key={course?._id}>
                <Link to={`/course/${course?._id}`}>
                    <CourseCard course={course} Height={"h-[150px] sm:h-[250px]"} />
                </Link>
            </SwiperSlide>
        ));
    }, [courses]);

    return (
        <Swiper
            mousewheel={{
                enabled: true,
                forceToAxis: true,
                sensitivity: 0.5,
            }}
            keyboard={{
                enabled: true,
                onlyInViewport: true,
            }}
            allowSlidePrev={true}
            slidesPerView={1.1}
            breakpoints={{
                300: { slidesPerView: 2.1, spaceBetween: 20 },
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 },
            }}
            modules={[Mousewheel]}
            spaceBetween={20}
            freeMode={{
                enabled: true,
                sticky: false,
                momentumRatio: 0.5,
                momentumBounce: false,
            }}
            lazy={true}
            watchSlidesProgress={true}
            speed={300}
            className="mySwiper mb-4"
            style={{
                "--swiper-navigation-size": "20px",
                transform: "translateZ(0)",
                willChange: "transform",
            }}
        >
            {courseSlides}
        </Swiper>
    );
});

CourseSlider.displayName = "CourseSlider";

export default CourseSlider;
