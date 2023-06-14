import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../constants/loginUser";

// TODO: anyを解消する。
const PrivateRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/signInPage" />;
  }
  return children;
};

export default PrivateRoute;
