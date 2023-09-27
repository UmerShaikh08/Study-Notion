import React from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const PieChart = ({ course }) => {
  Chart.register(...registerables);
  const [showEarning, setShowEarning] = useState(true);

  console.log("courses -->", course);
  const randomColor = (noOfColor) => {
    const color = [];
    for (let i = 0; i < noOfColor; i++) {
      const newColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)}) `;
      color.push(newColor);
    }

    return color;
  };

  const StudentEnrolled = {
    labels: course?.map((cour) => cour?.courseName),
    datasets: [
      {
        data: course?.map((cour) => cour?.studentsEnrolled?.length),
        backgroundColor: randomColor(course?.length),
      },
    ],
  };

  const totalEarnings = {
    labels: course?.map((cour) => cour?.courseName),
    datasets: [
      {
        data: course?.map(
          (cour) => cour?.price * cour?.studentsEnrolled?.length
        ),
        backgroundColor: randomColor(course?.length),
      },
    ],
  };

  return (
    course && (
      <div className="text-ricblack-5  w-[100%]   md:w-[70%] bg-richblack-800 rounded-md py-11">
        <div className="  flex flex-row justify-between px-3 mt-3">
          <h1 className="text-xl font-semibold text-richblack-5">Visualize</h1>
          <div className="flex flex-row gap-2   ">
            <button
              onClick={() => setShowEarning(true)}
              className={`py-1 px-2 ${
                showEarning
                  ? "bg-richblack-900 text-yellow-50 rounded-md"
                  : "text-richblack-200  "
              }`}
            >
              Revenue
            </button>
            <button
              onClick={() => setShowEarning(false)}
              className={` py-1 px-2 ${
                !showEarning
                  ? "bg-richblack-900 text-yellow-50  rounded-md"
                  : "text-richblack-200"
              }`}
            >
              Students
            </button>
          </div>
        </div>
        {showEarning ? (
          <Pie
            data={totalEarnings}
            options={{
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 20,
                    font: {
                      size: 12,
                    },
                  },
                },
              },
              aspectRatio: 2,
            }}
          ></Pie>
        ) : (
          <Pie
            data={StudentEnrolled}
            options={{
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    padding: 20,
                    font: {
                      size: 12,
                    },
                  },
                },
              },
              aspectRatio: 2,
            }}
          ></Pie>
        )}
      </div>
    )
  );
};

export default PieChart;
