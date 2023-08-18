import React, { useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../Data/navbar-links";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDashboard from "../../pages/ProfileDashboard";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import ProfileDropdown from "../auth/ProfileDropdrown";

const Navbar = () => {
  const [currTab, setCurrTab] = useState(NavbarLinks[0].title);

  const setMyTab = (value) => {
    setCurrTab(value);
  };

  const { user } = useSelector((store) => store.profile);
  const { totalItems } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.auth);
  console.log(user);

  const SubLinks = [
    {
      title: "python",
      link: "category/python",
    },
    {
      title: "c++",
      link: "category/c++",
    },
  ];

  return (
    <nav className="hidden  w-[100%] md:flex flex-row justify-around items-center font-inter bg-richblack-800  border-richblack-700 border-b-2 py-2">
      <Link to={"/"}>
        {" "}
        <img
          src={logo}
          width={160}
          height={42}
          loading="lazy"
          className=" saturate-200"
        />
      </Link>
      <div className="md:w-[50%] lg:w-[30%]  flex justify-between items-center">
        {NavbarLinks.map((ele, index) => {
          return ele.title === "Catalog" ? (
            <div className="realtive flex flex-col group" key={index}>
              <div className=" text-richblack-5 flex flex-row gap-2 items-center cursor-pointer">
                <p>{ele.title}</p>
                <IoIosArrowDown size={20} />
              </div>
              <div className=" absolute p-3 top-[8%] left-[35%]  invisible opacity-0 bg-richblack-5 flex flex-col lg:w-[300px] rounded-md transition-all duration-300   group-hover:opacity-100 group-hover:visible z-10">
                <div className=" absolute top-[-2%] left-[56%] rounded-sm bg-richblack-5 h-[2rem] w-[2rem] rotate-45 -z-10 "></div>

                {SubLinks.map((element, index) => {
                  return (
                    <Link to={element.link} key={index}>
                      <div className="mx-3 py-[0.5rem] px-[1rem] rounded-md text-lg hover:bg-richblack-50 ">
                        {element.title}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <Link to={ele.path} key={index}>
              {" "}
              <div
                className={`font-[400]  ${
                  currTab === ele.title ? "text-yellow-50" : "text-richblack-25"
                } `}
                onClick={() => {
                  setMyTab(ele.title);
                }}
              >
                {ele.title}{" "}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-row gap-5">
        {user && user.accountType !== "Instructor" ? (
          <Link to={"dashbord/cart"} className="relative flex">
            <AiOutlineShoppingCart size={25} className="text-richblack-200 " />
            {totalItems > 0 ? (
              <div className=" absolute right-[-30%] bottom-[-20%] w-[1.3rem] h-[1.3rem] rounded-full bg-richblack-700 text-sm text-yellow-100 text-center ">
                {" "}
                <p className="mx-auto"> {totalItems}</p>
              </div>
            ) : (
              ""
            )}
          </Link>
        ) : (
          ""
        )}

        {token !== null ? (
          <ProfileDropdown />
        ) : (
          <div className="text-richblack-100 flex flex-row gap-4 ">
            <Link to={"/login"}>
              <div className="border border-richblack-700 bg-richblack-800 py-2 px-3 rounded-lg transition-all duration-200 hover:scale-90 ">
                Log in
              </div>
            </Link>
            <Link to={"/signup"}>
              {" "}
              <div className="border border-richblack-700 bg-richblack-800 py-2 px-3 rounded-lg transition-all duration-200 hover:scale-90 ">
                Sign up
              </div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
