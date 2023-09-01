import React, { useState } from "react";
import { HiOutlineViewList } from "react-icons/hi";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit, MdOndemandVideo } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { setCourse } from "../../../../Redux/Slices/courseSlice";
import { deleteSubsection } from "../../../../services/operations/subsection";
import SubsetionModal from "./SubsetionModal";

const SubSections = ({
  _id: subSectionId,
  title = "",
  timeDuration = "",
  description = "",
  videoUrl = "",
  sectionId,
}) => {
  const [viewSubsection, setViewSubsection] = useState(null);
  const [editSubsection, setEditSubsection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.auth);
  const { course } = useSelector((store) => store.course);

  const deleteSubsectionHandler = async (e) => {
    e.preventDefault();
    console.log("hi");
    console.log(token);
    const result = await deleteSubsection(
      { subSectionId, sectionId, courseId: course._id },
      token
    );
    if (result) {
      dispatch(setCourse(result));
    }
  };

  return (
    <>
      <div className="w-[90%] mx-auto my-2 text-richblack-200 text-[1.2rem] flex flex-row justify-between items-center  border-b-2 border-richblack-500 ">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row items-center">
            {" "}
            <MdOndemandVideo />
          </div>
          <div> {title}</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <MdEdit
            onClick={(e) => {
              e.preventDefault();
              setEditSubsection({
                subSectionId,
                title,
                timeDuration,
                description,
                videoUrl,
                sectionId,
              });
            }}
          />
          <RiDeleteBin6Line
            onClick={(e) => {
              e.preventDefault();
              console.log("hi");
              setConfirmationModal({
                text1: "Delete this Sub-Section?",
                text2: "This lecture will be deleted",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: (e) => deleteSubsectionHandler(e),
                btn2Handler: () => setConfirmationModal(null),
              });
            }}
          />
          <div className="font-semibold">|</div>
          <AiFillCaretDown />
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {editSubsection && (
        <SubsetionModal
          modalData={editSubsection}
          setModalData={setEditSubsection}
          edit={true}
        />
      )}
    </>
  );
};

export default SubSections;
