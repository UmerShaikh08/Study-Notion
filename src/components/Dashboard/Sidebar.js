import React from "react";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { sidebarLinks } from "../../Data/dashboard-links";
import SideLinks from "./SideLinks";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((store) => store.auth);
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );

  if (authLoading || profileLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
      <div className="flex flex-col gap-2 ">
        {sidebarLinks.map((data) => {
          if (data.type && user?.accountType !== data.type) {
            console.log(data.type, "-->", user);

            return null;
          } else return <SideLinks key={data.id} {...data} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
