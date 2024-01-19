import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./contexts/auth.context";

export default function Protected() {
  const { isVerified } = useContext(AuthContext);

  if (!isVerified) {
    return <Navigate to="/password" />;
  }

  return <Outlet />;
}
