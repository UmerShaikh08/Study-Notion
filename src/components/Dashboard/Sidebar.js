import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { sidebarLinks } from "../../Data/dashboard-links";
import SideLinks from "./SideLinks";
import { REACT_APP_STUDENT } from "../../data";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { logout } from "../../services/operations/auth";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((store) => store.auth);
  const { user, loading: profileLoading } = useSelector(
    (store) => store.profile
  );
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setting = {
    id: 1,
    name: "Setting",
    path: "/dashboard/setting",
    type: REACT_APP_STUDENT,
    icon: "VscSettingsGear",
  };

  if (authLoading || profileLoading) {
    return <Loader />;
  }

  return (
    //h-[calc(100vh-3.5rem)]   not working sticky
    <div className=" flex h-[calc(100vh-3.5rem)]  min-w-[220px] flex-col shrink-0 gap-7 border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
      <div className="flex flex-col gap-2 ">
        {sidebarLinks.map((data) => {
          if (data?.type && user?.accountType !== data?.type) {
            return null;
          } else return <SideLinks key={data?.id} {...data} />;
        })}
      </div>
      <div>
        <div className="border-b-2 w-[80%]  mx-auto shadow-sm shadow-richblack-500"></div>
      </div>

      <div className="flex flex-col gap-2 ">
        <SideLinks {...setting} />

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
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
