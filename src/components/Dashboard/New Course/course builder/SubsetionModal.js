import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Upload from "../Upload";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../Redux/Slices/courseSlice";

// custom hooks
import useNewSubsection from "./hooks/useNewSubsection";
import useUpdateSubsection from "./hooks/useUpdateSubsection";

//  backend
import {
  createSubsection,
  updateSubsection,
} from "../../../../services/operations/subsection";

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

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const { NewSubsection } = useNewSubsection();
  const { UpdateSubsection } = useUpdateSubsection();

  const isSubsectionUpdated = (values) => {
    if (
      modalData.title !== values.title ||
      modalData.description !== values.description ||
      modalData.videoFile !== values.videoFile
    ) {
      return true;
    } else return false;
  };

  useEffect(() => {
    if (edit || view) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("videoFile", modalData.videoFile);
    }
  }, []);

  const onSubmit = async (data) => {
    if (view) {
      return;
    }

    const courseId = course?._id;

    if (edit) {
      const values = getValues();

      let formData = null;
      if (isSubsectionUpdated(values)) {
        formData = await UpdateSubsection({ modalData, values, courseId });
      } else {
        toast.error("No Changes Found");
        return;
      }

      setLoading(true);
      const result = await updateSubsection(formData, token);
      setLoading(false);

      if (result) {
        dispatch(setCourse(result));
      }

      setModalData(null);
      return;
    }

    const formData = await NewSubsection({ data, modalData, courseId });

    setLoading(true);
    const result = await createSubsection(formData, token);
    setLoading(false);

    if (result) {
      dispatch(setCourse(result));
    }

    setModalData(null);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {add ? "Adding" : edit ? "Editing" : view ? "Viewing" : ""} Lecture
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
            viewData={view ? modalData?.videoFile : null}
            editData={edit ? modalData?.videoFile : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="title">
              Lecture Title
            </label>
            <input
              id="title"
              disabled={view || loading}
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
              disabled={view || loading}
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
              {loading
                ? "Loading..."
                : edit
                ? "Save Changes"
                : add
                ? "Save"
                : ""}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubsetionModal;
