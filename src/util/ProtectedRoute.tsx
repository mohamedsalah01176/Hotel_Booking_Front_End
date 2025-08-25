import { type JSX } from "react";
import { Navigate, useLocation } from "react-router";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../interface/user";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookie.get("token");
  const {pathname}=useLocation()
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  console.log(pathname,"dddddddddd")
  try {
    const decode: JwtPayload = jwtDecode(token);

    // لو مش host أو manager
    if (decode.role !== "host" && decode.role !== "manager") {
      return <Navigate to="/login" replace />;
    }
    if(decode.role === "host" && pathname === "/managerDashboard"){
      return <Navigate to="/dashboard" replace />;
    }
    if(decode.role === "manager" && pathname === "/dashboard"){
      return <Navigate to="/managerDashboard" replace />;
    }

    return children;
  } catch (error) {
    console.log(error)
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
