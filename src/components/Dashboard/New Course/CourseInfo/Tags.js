import React, { useState } from "react";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Tags = ({ register, setValue, name, errors }) => {
  const { course } = useSelector((store) => store.course);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState(
    course?.tags?.length > 0 ? course?.tags : []
  );

  // tag handlers
  const handleTagList = (e) => {
    console.log(e);
    console.log("key code --->", e.keyCode);

    if (e.charCode === 13 || e.key === "Enter") {
      if (tag.length === 0) return;
      else if (tagList?.includes(tag)) {
        setTag("");
      } else {
        const list = [...tagList, tag];
        setTagList(list);
        setTag("");
      }
    }
  };

  const removeTag = (idx) => {
    const list = [...tagList];
    list.splice(idx, 1);
    setTagList(list);
  };

  useEffect(() => {
    register(name);
  }, []);

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList]);
  return (
    <div className="  flex flex-col w-full gap-2">
      <div className="flex flex-wrap gap-3 ">
        {tagList &&
          tagList.map((data, idx) => (
            <div
              key={idx}
              className="flex flex-row gap-1 bg-yellow-200 rounded-full items-center  py-1 px-3"
            >
              <div>{data}</div>
              <RxCross2
                className="cursor-pointer"
                onClick={() => removeTag(idx)}
              />
            </div>
          ))}
      </div>
      <label htmlFor="tags  " className="text-sm">
        Tags <span className="text-red-200">*</span>
      </label>

      <input
        type="text"
        id="tags"
        name="tags"
        value={tag}
        placeholder="Enter Tags and press enter "
        className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 pl-10"
        onChange={(e) => setTag(e.target.value)}
        onKeyDownCapture={(e) => {
          handleTagList(e);
        }}
        onKeyUpCapture={(e) => {
          handleTagList(e);
        }}
        // onKeyUp={(e) => {
        //   handleTagList(e);
        // }}
        // onKeyDown={(e) => {
        //   handleTagList(e);

        // }}
      />
      {errors.tags && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          Course Tags are required
        </span>
      )}
    </div>
  );
};

export default Tags;
