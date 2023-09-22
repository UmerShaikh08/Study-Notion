import React from "react";
import HighlightGold from "../components/about/HighlightGold";
import about1 from "../assets/Images/aboutus1.webp";
import about2 from "../assets/Images/aboutus2.webp";
import about3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Our from "../components/about/Our";
import StatsCmp from "../components/about/StatsCmp";
import LearningGrid from "../components/about/LearningGrid";
import ContactFormSection from "../components/about/ContactFormSection";
import Footer from "./../components/common/Footer";
import Reviews from "../components/home/Reviews";
import { Highlight } from "../components/home/Highlight";

const About = () => {
  const ourData = [
    {
      heading: "Our Founding Story",
      description1:
        "Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.",
      description2:
        "As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.",
      color: "from-[#833AB4] via-[#FD1D1D] to-[#FCB045]",
    },
    {
      heading: "Our Vision",
      description1:
        "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.",
      color: "from-[#FF512F]  to-[#F09819]",
    },
    {
      heading: "Our Mission",
      description1:
        "Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.",
      color: "from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]",
    },
  ];
  return (
    <div className="flex flex-col font-inter bg-richblack-900">
      {/* section 1 */}
      <section className="bg-richblack-700 w-full mx-auto">
        <div className=" relative w-11/12 max-w-maxContent  text-richblack-5 mt-16 flex flex-col items-center mx-auto">
          <div className="flex flex-col lg:w-[70%] gap-6 mb-32 md:mb-44 lg:mb-56">
            <h1 className="text-4xl font-semibold  text-center ">
              Driving Innovation in Online Education for a{" "}
              <Highlight text={"Brighter Future"} />
            </h1>
            <p className="text-center text-richblack-300 font-medium lg:px-5">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="w-full absolute top-[80%] lg:top-[60%]  right-0 left-0 flex flex-row gap-8  ">
            <img src={about1} alt="about img" className="w-[30%]" />
            <img src={about2} alt="about img" className="w-[30%]" />
            <img src={about3} alt="about img" className="w-[30%] " />
          </div>
        </div>
      </section>
      {/* section 2 */}
      <section className="w-full  shadow-sm  shadow-richblack-500 mb-6">
        <div className=" relative w-11/12 max-w-maxContent  text-richblack-5  mx-auto mb-24 mt-[6rem]   md:mt-[12rem]">
          <p className="text-4xl   text-center font-semibold ">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform <Highlight text={"combines technology"} /> ,
            <HighlightGold text={"expertise"} />, and community to create an{" "}
            <HighlightGold text={"unparalleled educational experience."} />
          </p>
        </div>
      </section>

      {/* Section 3  */}
      <section className="w-11/12 max-w-maxContent mx-auto flex flex-col mt-[8rem] mb-36 gap-48">
        <div className="flex flex-col lg:flex-row  gap-32 lg:gap-44 items-center ">
          <Our
            heading={ourData[0].heading}
            description1={ourData[0].description1}
            description2={ourData[0].description2}
            color={ourData[0].color}
          />
          <div className=" mx-auto">
            <img
              src={FoundingStory}
              alt="img"
              className="  shadow-[0px_0px_20px_red]"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-56 ">
          <Our
            heading={ourData[1].heading}
            description1={ourData[1].description1}
            description2={ourData[1].description2}
            color={ourData[1].color}
          />
          <Our
            heading={ourData[2].heading}
            description1={ourData[2].description1}
            description2={ourData[2].description2}
            color={ourData[2].color}
          />
        </div>
      </section>

      {/* section 4 */}
      <StatsCmp />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white mb-14">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* section 5 */}
      <Reviews />
      {/* section 6 */}
      <Footer />
    </div>
  );
};

export default About;
