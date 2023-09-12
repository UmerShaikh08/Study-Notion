import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { formatDate } from "../../../utils/formdate";
import { useSelector } from "react-redux";
import { deleteCourse } from "../../../services/operations/courses";
import ConfirmationModal from "../../common/ConfirmationModal";
import { COURSE_STATUS } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
const TRUNCATE_LENGTH = 30;

const CourseTable = ({ courses, setCourses }) => {
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((store) => store.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    const result = await deleteCourse(courseId, token);
    setLoading(false);

    if (result) {
      setCourses(result);
    }

    setConfirmationModal(null);
  };
  return (
    <div className="text-richblack-5 overflow-x-hidden ">
      <div className="rounded-xl lg:border border-richblack-700 mx-auto">
        <div>
          <div className="hidden md:flex gap-x-10 rounded-t-md border-b border-b-richblack-700 px-6 py-2">
            <div className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </div>
            <div className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </div>
            <div className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </div>
            <div className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 ">
          {courses.toReversed()?.map((course) => (
            <div
              key={course._id}
              className="flex flex-col md:flex-row gap-y-2 lg:gap-x-10 justify-between  border border-richblack-700 md:border-none px-6 py-8 m-3 "
            >
              {/* courses info */}
              <section className="flex flex-col w-[65%] md:flex-row gap-x-4 gap-y-3">
                <img
                  src={course?.thumbnail}
                  className=" h-[200px] md:h-[148px] w-[80vw] sm:w-[50vw] md:w-[220px] rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between gap-1">
                  <p className="text-lg font-semibold text-richblack-5">
                    {course?.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.split(" ").length >
                    TRUNCATE_LENGTH
                      ? course.courseDescription
                          .split(" ")
                          .slice(0, TRUNCATE_LENGTH)
                          .join(" ") + "..."
                      : course.courseDescription}
                  </p>
                  <p className="text-[12px] text-white">
                    Created: {formatDate(course.createdAt)}
                  </p>

                  {course?.status === COURSE_STATUS.PUBLISHED ? (
                    <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <p className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                        <FaCheck size={8} />
                      </p>
                      Published
                    </div>
                  ) : (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                      <HiClock size={14} />
                      Drafted
                    </p>
                  )}
                </div>
              </section>
              <div className="flex flex-row gap-10">
                {/* duration */}
                <section className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </section>

                {/* price  */}
                <section className="text-sm font-medium text-richblack-100">
                  ₹ {course?.price}
                </section>

                {/* edit */}
                <section className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </section>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
