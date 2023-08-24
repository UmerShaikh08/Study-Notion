import React from "react";
import { useSelector } from "react-redux";
import { REACT_APP_STUDENT } from "../../data";
import { Navigate } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const { user } = useSelector((store) => store.profile);
  console.log(user);
  if (user.accountType === REACT_APP_STUDENT) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default StudentRoute;
