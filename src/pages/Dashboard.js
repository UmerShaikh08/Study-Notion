import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((store) => store.profile);
  const { loading: authLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  return profileLoading || authLoading ? (
    <Loader />
  ) : (
    <div className="relative flex min-h-[cal(100vh-3.5rem)]  ">
      {/* sidebar permanant */}
      <Sidebar />
      <div className=" h-[cal(100vh-3.5rem)] flex-1  overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 ">
          {/* changing dynamically */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
