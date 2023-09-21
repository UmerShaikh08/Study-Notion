import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const InstructorRoute = ({ children }) => {
  const { user } = useSelector((store) => store.profile);

  if (user.accountType === process.env.REACT_APP_INSTRUCTOR) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default InstructorRoute;
