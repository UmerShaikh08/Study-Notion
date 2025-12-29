import React from "react";
import SubSections from "./SubSections";
import ConfirmationModal from "../../../common/ConfirmationModal";
import SubsetionModal from "./SubsetionModal";
import { useState } from "react";
import { setCourse } from "../../../../Redux/Slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";

// backend
import { deleteSection } from "../../../../services/operations/section";

// icons
import { BiPlus } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFolder } from "react-icons/fa";
import {
  AiFillCaretDown,
  AiFillCaretRight,
  AiFillFolderOpen,
} from "react-icons/ai";

const Sections = ({ section, handleEditSection }) => {
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);

  const [showSubsection, setShowSubsection] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addSubsection, setAddSubsection] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const deleteSectionHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const result = await deleteSection(section?._id, course?._id, token);
    setLoading(false);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);

    return;
  };

  return (
    <>
      <div className="flex flex-col gap-3 bg-richblack-900 rounded-md p-3">
        <div>
          <div className="text-richblack-300 font-semibold text-[1.2rem] flex flex-row justify-between gap-5 items-center border-b-2 border-richblack-500 ">
            <div
              className="flex flex-row items-center gap-2 mb-2 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setShowSubsection(!showSubsection);
              }}
            >
              {" "}
              <div className="flex flex-row items-center">
                {showSubsection ? (
                  <AiFillCaretDown className="text-richblack-5" />
                ) : (
                  <AiFillCaretRight className="text-richblack-5" />
                )}
                {showSubsection ? (
                  <AiFillFolderOpen size={24} className="text-[#2C73D2]" />
                ) : (
                  <FaFolder className="text-[#2C73D2]" />
                )}
              </div>
              <div> {section?.sectionName}</div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MdEdit
                className="text-gradientGreen-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();

                  handleEditSection(section?._id, section?.sectionName);
                }}
              />
              <RiDeleteBin6Line
                className="text-red-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: (e) => deleteSectionHandler(e),
                    btn2Handler: () => setConfirmationModal(null),
                  });
                }}
              />
              <div className="font-semibold">|</div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setShowSubsection(!showSubsection);
                }}
              >
                {" "}
                {showSubsection ? (
                  <AiFillCaretDown className="text-richblack-5 cursor-pointer" />
                ) : (
                  <AiFillCaretRight className="text-richblack-5 cursor-pointer" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          {showSubsection &&
            section?.subSection?.length > 0 &&
            section?.subSection?.map((subsection) => (
              <SubSections
                key={subsection?._id}
                {...subsection}
                sectionId={section?._id}
              />
            ))}
        </div>
        <div className="text-yellow-50 ">
          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setAddSubsection(section?._id);
            }}
            className="flex flex-row items-center gap-1 "
          >
            <BiPlus size={30} />{" "}
            <p className="text-md font-semibold">Add Lecture</p>
          </button>
        </div>
      </div>

      {addSubsection && (
        <SubsetionModal
          modalData={addSubsection}
          setModalData={setAddSubsection}
          add={true}
        />
      )}

      {/* this modal is for deleting section */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sections;
