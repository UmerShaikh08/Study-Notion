import React, { useState } from "react";
import Loader from "../common/Loader";
import SideLinks from "./SideLinks";
import ConfirmationModal from "../common/ConfirmationModal";
import { logout } from "../../services/operations/auth";
import { BiMenu } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../utils/data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((store) => store.auth);
  const { loading: profileLoading, user } = useSelector(
    (store) => store.profile
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const setting = {
    id: 1,
    name: "Setting",
    path: "/dashboard/setting",
    type: process.env.REACT_APP_STUDENT,
    icon: "VscSettingsGear",
  };

  if (authLoading || profileLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={`hidden  fixed lg:flex z-30 h-[calc(100vh-3.2rem)] transition-transform duration-200 ease-in-out flex-row gap-2  ${
          showSidebar ? "translate-x-[0px]" : "translate-x-[-220px]"
        } `}
      >
        <div className=" flex z-30 h-[calc(100vh-3.2rem)] min-w-[220px] flex-col gap-2 border-r-[1px] border-r-richblack-700 bg-richblack-800  py-10">
          <div className="flex flex-col gap-2 ">
            {sidebarLinks &&
              sidebarLinks.map((data) => {
                if (data?.type && user?.accountType !== data?.type) {
                  return null;
                } else return <SideLinks key={data?.id} {...data} />;
              })}
          </div>
          <div>
            <div className="border-b-2 w-[80%]  mx-auto shadow-sm shadow-richblack-500 my-4"></div>
          </div>

          <div className="flex flex-col gap-2 ">
            <SideLinks {...setting} />

            {/* logout */}
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className=" py-2 text-sm font-medium text-richblack-300"
            >
              <div className="`max-w-maxContent flex flex-row  mx-auto items-center gap-x-1 py-2 pl-3 text-sm transition-all duration-200">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>

          {confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </div>
        <div
          className=" min-h-[1rem] h-fit text-richblack-5 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <RxCross2 size={30} /> : <BiMenu size={30} />}
        </div>
      </div>
      <div className="flex lg:hidden fixed bottom-0 justify-between z-10 items-center px-2 py-1 bg-richblack-900  w-full">
        <div className="flex flex-row gap-1 w-full justify-between">
          {sidebarLinks &&
            sidebarLinks.map((data) => {
              if (data?.type && user?.accountType !== data?.type) {
                return null;
              } else return <SideLinks key={data?.id} {...data} />;
            })}
          <SideLinks {...setting} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
