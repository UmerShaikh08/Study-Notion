import React from "react";
import { useState } from "react";
import Footer from "../common/Footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getAllCategories,
  getCategoriesPageDetails,
} from "../../services/operations/category";
import { useSelector } from "react-redux";
import CourseCard from "../catalog/CourseCard";
import CourseSlider from "../catalog/CourseSlider";

const Catalog = () => {
  const [active, setActive] = useState(1);
  const { catalogName } = useParams();
  const { token } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState({});

  const fetchCategories = async () => {
    const result = await getAllCategories(token);
    if (result) {
      console.log("result ====> ", result);
      console.log("catalog name --->", catalogName);
      const category_Id = result.filter(
        (data) =>
          data?.name?.split(" ")?.join("-")?.toLowerCase() === catalogName
      )[0]._id;

      setCategoryId(category_Id);
      console.log("category id ", categoryId);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [catalogName]);

  const fetchCatalogPagedata = async () => {
    const result = await getCategoriesPageDetails(categoryId);
    console.log("catalog page details ---->", result);

    if (result) {
      setCatalogPageData(result);
    }
  };
  useEffect(() => {
    if (categoryId) {
      fetchCatalogPagedata();
    }
  }, [categoryId]);

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4 ">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {" "}
            {catalogPageData.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData.selectedCategory?.description}
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
        <div>
          <h1 className="text-4xl text-richblack-5"></h1>
          <CourseSlider courses={catalogPageData?.selectedCategory?.course} />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-4xl text-richblack-5">
          Top courses in {catalogPageData?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider courses={catalogPageData?.differentCategory?.course} />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="font-semibold text-4xl text-richblack-5">
          Frequently Bought
        </div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2  md:mx-auto ">
            {catalogPageData?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <CourseCard course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
