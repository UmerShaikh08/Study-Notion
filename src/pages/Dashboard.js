import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-[cal(100vh-3.5rem)]">
      <Sidebar />
      <div className=" h-[cal(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
