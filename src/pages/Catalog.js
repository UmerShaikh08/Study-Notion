import React from "react";
import Footer from "../components/common/Footer";
import CourseCard from "../components/catalog/CourseCard";
import CourseSlider from "../components/catalog/CourseSlider";
import { setProgress } from "../Redux/Slices/loadingbarSlice";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../services/operations/category";
import { getCategoriesPageDetails } from "../services/operations/category";
import CourseCardShimmer from "../components/shimmer/CourseCardShimmer";

const Catalog = () => {
  const [active, setActive] = useState(1);
  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState({});
  const [showShimmer, setShowShimmer] = useState(true);

  const { catalogName } = useParams();
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const fetchCategories = async () => {
    const result = await getAllCategories(token);
    if (result) {
      const category_Id = result.filter(
        (data) =>
          data?.name?.split(" ")?.join("-")?.toLowerCase() ===
          catalogName?.split(" ")?.join("-")?.toLowerCase()
      )[0]?._id;

      setCategoryId(category_Id);
    }
  };

  const fetchCatalogPagedata = async () => {
    const result = await getCategoriesPageDetails(categoryId);
    if (result) {
      setCatalogPageData(result);
      setShowShimmer(true);
      setTimeout(() => {
        setShowShimmer(false);
      }, 1500);
    }
  };

  useEffect(() => {
    fetchCategories();
    dispatch(setProgress(100));
    fetchCatalogPagedata();
  }, [catalogName, categoryId]);

  return (
    <>
      {/* Hero Section */}
      {catalogPageData && (
        <>
          <div className=" box-content bg-richblack-800 px-4 ">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {" "}
                {catalogPageData?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.selectedCategory?.description}
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading text-richblack-5 text-4xl font-semibold">
              Courses to get you started
            </div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            {!showShimmer && catalogPageData ? (
              <div>
                <CourseSlider
                  courses={catalogPageData?.selectedCategory?.course}
                />
              </div>
            ) : (
              <div className="flex mx-auto gap-6 w-[80%] sm:w-[50%] md:w-full flex-col md:flex-row">
                <CourseCardShimmer />
                <CourseCardShimmer />
                <CourseCardShimmer />
              </div>
            )}
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="text-4xl text-richblack-5">
              Top courses in {catalogPageData?.differentCategory?.name}
            </div>
            <div className="py-8">
              {!showShimmer ? (
                <div>
                  <CourseSlider
                    courses={catalogPageData?.differentCategory?.course}
                  />
                </div>
              ) : (
                <div className="flex mx-auto gap-6 w-[80%] sm:w-[50%] md:w-full flex-col md:flex-row">
                  <CourseCardShimmer />
                  <CourseCardShimmer />
                  <CourseCardShimmer />
                </div>
              )}
            </div>
          </div>

          {/* Section 3 */}
          <div className=" mx-auto box-content  max-w-maxContentTab p-2 md:px-4 2 md:py-12 lg:max-w-maxContent">
            <div className="font-semibold text-4xl text-richblack-5">
              Frequently Bought
            </div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2  md:mx-auto ">
                {!showShimmer ? (
                  catalogPageData &&
                  catalogPageData?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course) => (
                      <Link to={`/course/${course?._id}`} key={course?._id}>
                        <CourseCard
                          course={course}
                          delayTime={1500}
                          Height={"h-[400px]"}
                        />
                      </Link>
                    ))
                ) : (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2  md:mx-auto lg:w-[1000px]">
                    <CourseCardShimmer />
                    <CourseCardShimmer />
                    <CourseCardShimmer />
                    <CourseCardShimmer />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Catalog;
