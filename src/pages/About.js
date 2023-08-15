import React from "react";
import { Highlight } from "../components/home/Highlight";

const About = () => {
  return (
    <div>
      <div className="w-11/12 max-w-maxContent bg-richblack-800 text-richblack-5 mt-16 flex flex-row items-center mx-auto">
        <div>
          <h1 className="text-4xl font-semibold text-center max-w-fit ">
            Driving Innovation in Online Education for a{" "}
            <Highlight text={"Brighter Future"} />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About;
