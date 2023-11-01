import React from "react";
import { setProgress } from "../../Redux/Slices/loadingbarSlice";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

const SideLinks = ({ name, path, icon }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const Icon = Icons[icon];

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleLoadingbar = () => {
    dispatch(setProgress(40));
    const time = setTimeout(() => {
      dispatch(setProgress(100));
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  };

  return (
    <div>
      <NavLink onClick={handleLoadingbar} to={path} className="w-full">
        <div
          className={`max-w-maxContent flex flex-row  mx-auto items-center px-1  gap-x-1 py-2 lg:pl-3 text-sm transition-all duration-200 ${
            matchRoute(path)
              ? "text-yellow-50 border-b-2 lg:border-b-0 lg:border-l-2  border-yellow-5 bg-yellow-800"
              : "bg-opacity-0 text-richblack-300"
          }`}
        >
          <Icon size={25} />

          <div title={name} className="no-underline hidden md:block">
            {name}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SideLinks;
