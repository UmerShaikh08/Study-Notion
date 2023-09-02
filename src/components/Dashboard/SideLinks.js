import React from "react";
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

  return (
    <div>
      <NavLink to={path} className="w-full">
        <div
          className={`max-w-maxContent flex flex-row  mx-auto items-center gap-x-1 py-2 pl-3 text-sm transition-all duration-200 ${
            matchRoute(path)
              ? "text-yellow-50 border-l-2  border-yellow-5 bg-yellow-800"
              : "bg-opacity-0 text-richblack-300"
          }`}
        >
          <Icon className="text-lg" />

          <div className="">{name}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default SideLinks;
