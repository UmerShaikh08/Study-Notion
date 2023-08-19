import React from "react";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { sidebarLinks } from "../../Data/dashboard-links";
import SideLinks from "./SideLinks";
import { REACT_APP_STUDENT } from "../../data";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((store) => store.auth);
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );

  const LogoutAndSetting = [
    {
      id: 1,
      name: "Setting",
      path: "/dashboard/setting",
      type: REACT_APP_STUDENT,
      icon: "VscSettingsGear",
    },
    {
      id: 2,
      name: "Logout",
      path: "/dashboard/logout",
      type: REACT_APP_STUDENT,
      icon: "VscSignOut",
    },
  ];

  if (authLoading || profileLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col gap-7 border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
      <div className="flex flex-col gap-2 ">
        {sidebarLinks.map((data) => {
          if (data.type && user?.accountType !== data.type) {
            return null;
          } else return <SideLinks key={data.id} {...data} />;
        })}
      </div>
      <div>
        <div className="border-b-2 w-[80%]  mx-auto shadow-sm shadow-richblack-500"></div>
      </div>

      <div className="flex flex-col gap-2 ">
        {LogoutAndSetting.map((data) => {
          if (data.type && user?.accountType !== data.type) {
            return null;
          } else return <SideLinks key={data.id} {...data} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
