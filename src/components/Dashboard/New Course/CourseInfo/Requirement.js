import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Requirement = ({ register, setValue, name, errors }) => {
  const { course } = useSelector((store) => store.course);
  const [requirements, setRequirements] = useState("");
  const [requirementList, setRequirementsList] = useState(
    course?.requirements?.length > 0 ? course?.requirements : []
  );

  // requirements handler
  const handleRequirementList = (e) => {
    e.preventDefault();
    if (requirements.length === 0) return;
    const list = [...requirementList, requirements];
    setRequirementsList(list);
    setRequirements("");
  };

  const removeRequirement = (idx) => {
    const list = [...requirementList];
    list.splice(idx, 1);
    setRequirementsList(list);
  };

  useEffect(() => {
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);
  return (
    <div className="  flex flex-col w-full gap-2">
      <label htmlFor="requirements  " className="text-sm">
        Requirements / Instruction <span className="text-red-200">*</span>
      </label>

      <input
        type="text"
        id="requirements"
        name="requirements"
        value={requirements}
        className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 pl-10"
        onChange={(e) => setRequirements(e.target.value)}
      />

      <button
        className="text-yellow-50 font-bold text-start"
        onClick={handleRequirementList}
      >
        Add
      </button>

      {requirementList.length > 0 && (
        <ul className="flex flex-col gap-3">
          {requirementList.map((data, idx) => (
            <div key={idx} className="flex flex-row gap-3">
              <li>{data}</li>{" "}
              <button
                className="text-richblack-400 text-sm bg-richblack-900 px-1 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  removeRequirement(idx);
                }}
              >
                clear
              </button>
            </div>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-yellow-100">
          Course Benefits are required
        </span>
      )}
    </div>
  );
};

export default Requirement;
