import React, { useState } from "react";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const Tags = ({ register, setValue, name }) => {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  // tag handlers
  const handleTagList = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      if (tag.length === 0) return;
      else if (tagList.includes(tag)) {
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
    register(name, { required: true });
  }, []);

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList]);
  return (
    <div className="  flex flex-col w-full gap-2">
      <div className="flex flex-row gap-3 ">
        {tagList.map((data, idx) => (
          <div
            key={idx}
            className="flex flex-row gap-1 bg-yellow-200 rounded-full items-center  py-1 px-3"
          >
            <div>{data}</div>
            <RxCross2 className="cursor-pointer" onClick={removeTag} />
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
        className=" w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 pl-10"
        onChange={(e) => setTag(e.target.value)}
        onKeyUp={(e) => {
          handleTagList(e);
        }}
      />
    </div>
  );
};

export default Tags;
