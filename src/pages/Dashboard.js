import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((store) => store.profile);
  const { loading: authLoading } = useSelector((store) => store.auth);

  return profileLoading || authLoading ? (
    <Loader />
  ) : (
    <>
      <div className="relative flex md:min-h-[calc(100vh-3.5rem)] ">
        {/* sidebar permanant */}
        <Sidebar />
        <div className=" h-[calc(100vh-3.5rem)] flex-1 overflow-auto md:ml-[5rem]">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10  ">
            {/* changing dynamically */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
