import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImg } from "../../../services/operations/profile";

const ProfileImg = () => {
  const { user } = useSelector((store) => store.profile);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const selectImg = useRef(null);
  const [image, setImage] = useState("");

  const imgClick = () => {
    selectImg.current.click();
  };
  console.log(user.img);

  const uploadImg = () => {
    const formData = new FormData();
    formData.append("image", image);
    dispatch(updateProfileImg(formData, token));
  };

  return (
    <div className="text-white bg-richblack-800 p-10 rounded-md shadow-sm shadow-richblack-500">
      <div className="flex flex-row items-end gap-4">
        <img
          src={image ? URL.createObjectURL(image) : user.img}
          alt="profile img"
          className="max-h-20 max-w-20 rounded-full"
        />{" "}
        <div className="flex flex-col gap-2">
          <div>Change Profile Picture</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={imgClick}
              className={`flex items-center   gap-3 transition-all duration-150 font-medium py-2 px-5 rounded-lg text-lg hover:scale-95 bg-richblack-700 text-richblack-5`}
            >
              Select
            </button>
            <input
              type="file"
              className="hidden"
              onChange={(data) => {
                setImage(data.target.files[0]);
                console.log(data.target.files[0]);
              }}
              ref={selectImg}
            />
            <button
              onClick={() => {
                uploadImg();
              }}
              className={`flex items-center   gap-3 transition-all duration-150 font-medium py-2 px-5 rounded-lg text-lg hover:scale-95 bg-yellow-100 text-richblack-900`}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImg;
