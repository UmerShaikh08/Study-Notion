import React, { useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDashboard from "../../pages/ProfileDashboard";

const Navbar = () => {
  const [currTab, setCurrTab] = useState(NavbarLinks[0].title);

  const setMyTab = (value) => {
    setCurrTab(value);
  };

  const { user } = useSelector((store) => store.profile);
  const { totalItems } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.auth);
  console.log(user);

  return (
    <nav className="w-[100%] flex flex-row justify-around items-center font-inter bg-richblack-800  border-richblack-700 border-b-2 py-2">
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
      <div className="lg:w-[25%]  flex justify-between items-center">
        {NavbarLinks.map((ele, index) => {
          return (
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
        <ProfileDashboard />
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
    </nav>
  );
};

export default Navbar;
