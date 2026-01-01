import React, { useState } from "react";
import ConfirmationModal from "../../../common/ConfirmationModal";
import SubsetionModal from "./SubsetionModal";
import { setCourse } from "../../../../Redux/Slices/courseSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdOndemandVideo } from "react-icons/md";

// backend call
import { deleteSubsection } from "../../../../services/operations/subsection";

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
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const dispatch = useDispatch();
    const { token } = useSelector((store) => store.auth);
    const { course } = useSelector((store) => store.course);

    const deleteSubsectionHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        const result = await deleteSubsection({ subSectionId, sectionId, courseId: course?._id }, token);
        setLoading(false);

        if (result) {
            dispatch(setCourse(result));
        }
    };

    return (
        <>
            <div className="w-[90%] mx-auto my-2 text-richblack-200 text-[1.2rem] flex flex-row justify-between items-center  border-b-2 border-richblack-500 ">
                <div
                    className="flex flex-row items-center gap-3 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        setViewSubsection({
                            subSectionId,
                            title,
                            timeDuration,
                            description,
                            videoUrl: videoUrl,
                            sectionId,
                        });
                    }}
                >
                    <div className="flex flex-row items-center">
                        {" "}
                        <MdOndemandVideo className="text-red-200" />
                    </div>
                    <div> {title}</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <MdEdit
                        className="text-gradientGreen-200 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            setEditSubsection({
                                subSectionId,
                                title,
                                timeDuration,
                                description,
                                videoUrl: videoUrl,
                                sectionId,
                            });
                        }}
                    />
                    <RiDeleteBin6Line
                        className="text-red-200 cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();

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
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            {editSubsection && (
                <SubsetionModal modalData={editSubsection} setModalData={setEditSubsection} edit={true} />
            )}

            {viewSubsection && (
                <SubsetionModal modalData={viewSubsection} setModalData={setViewSubsection} view={true} />
            )}
        </>
    );
};

export default SubSections;
