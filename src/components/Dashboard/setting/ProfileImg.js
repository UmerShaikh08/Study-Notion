import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImg } from "../../../services/operations/profile";
import { setLoading } from "../../../Redux/Slices/profileSlice";
import { AiOutlineUpload } from "react-icons/ai";
import IconBtn from "../IconBtn";

const ProfileImg = () => {
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const selectImg = useRef(null);
  const [image, setImage] = useState("");
  // dispatch(setLoading(false));

  const imgClick = () => {
    selectImg.current.click();
  };

  const uploadImg = () => {
    const formData = new FormData();
    formData.append("image", image);
    dispatch(updateProfileImg(formData, token, user));
  };

  return (
    <div className="text-white bg-richblack-800 p-2 sm:p-10 rounded-md shadow-sm shadow-richblack-500">
      <div className="flex flex-row items-end gap-4">
        <img
          src={image ? URL.createObjectURL(image) : user?.img}
          alt="profile img"
          className="aspect-square w-[78px] rounded-full object-cover"
        />{" "}
        <div className="flex flex-col gap-2">
          <div>Change Profile Picture</div>
          <div className="flex flex-col sm:flex-row gap-2 w-fit">
            <button
              onClick={imgClick}
              className={`flex items-center   gap-3 transition-all duration-150 font-medium py-1 sm:py-2 px-3 sm:px-5 rounded-lg text-lg hover:scale-95 bg-richblack-700 text-richblack-5`}
            >
              Select
            </button>
            <input
              type="file"
              className="hidden"
              onChange={(data) => {
                if (data.target.files[0]) {
                  setImage(data.target.files[0]);
                }
              }}
              ref={selectImg}
            />
            <IconBtn onclick={uploadImg} className={`w-fit`}>
              {profileLoading ? (
                "Uploading..."
              ) : (
                <div className=" flex flex-row gap-3 items-center">
                  {" "}
                  Upload <AiOutlineUpload />{" "}
                </div>
              )}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImg;
