import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { REACT_APP_INSTRUCTOR } from "../../data";

const InstructorRoute = ({ children }) => {
  const { user } = useSelector((store) => store.profile);

  if (user.accountType === REACT_APP_INSTRUCTOR) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default InstructorRoute;
