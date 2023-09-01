import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import Upload from "../Upload";
import {
  createSubsection,
  updateSubsection,
} from "../../../../services/operations/subsection";
import { setCourse } from "../../../../Redux/Slices/courseSlice";

const SubsetionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  console.log("title --> , ", modalData.title);

  console.log("modal data ---> ", modalData);
  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  const isSubsectionUpdated = (values) => {
    if (
      modalData.title !== values.title ||
      modalData.description !== values.description ||
      modalData.videoUrl !== values.videoUrl ||
      modalData.timeDuration !== values.timeDuration
    ) {
      return true;
    } else return false;
  };

  const setAllValues = () => {
    if (edit || view) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("videoFile", modalData.videoFile);
    }
    return;
  };

  useEffect(() => {
    setAllValues();
  }, []);

  const onSubmit = async (data) => {
    if (edit) {
      const values = getValues();
      console.log(" i am in edit");

      const formData = new FormData();
      if (isSubsectionUpdated(values)) {
        formData.append("subSectionId", modalData.subSectionId);
        formData.append("courseId", course?._id);

        if (modalData.title !== values.title) {
          formData.append("title", values.title);
        }
        if (modalData.description !== values.description) {
          formData.append("title", values.title);
        }
        if (modalData.timeDuration !== values.timeDuration) {
          formData.append("title", values.title);
        }
        if (modalData.videoUrl !== values.videoUrl) {
          formData.append("title", values.title);
        }
      } else {
        toast.error("No Changes Found");
      }

      const result = await updateSubsection(formData, token);

      if (result) {
        dispatch(setCourse(result));
        console.log("edited course -->", course);
      }

      setModalData(null);
      return;
    }

    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile);
    formData.append("sectionId", modalData);
    formData.append("courseId", course?._id);

    const result = await createSubsection(formData, token);
    if (result) {
      console.log("i am in result ");
      dispatch(setCourse(result));
    }
    console.log(result);
    setModalData(null);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            Adding Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="videoFile"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData?.videoUrl : null}
            editData={edit ? modalData?.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="title">
              Lecture Title
            </label>
            <input
              id="title"
              placeholder="Enter Lecture Title"
              {...register("title", { required: true })}
              className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="description">
              Lecture Description{" "}
            </label>
            <textarea
              id="description"
              placeholder="Enter Lecture Description"
              {...register("description", { required: true })}
              className=" pt-3 h-[10rem] w-full bg-richblack-700  rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 placeholder:text-start "
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-yellow-100 py-1 p-3 text-richblack-900 rounded-md ${
                view ? "hidden" : ""
              }`}
            >
              {edit ? "Save Changes" : add ? "Save" : ""}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubsetionModal;
