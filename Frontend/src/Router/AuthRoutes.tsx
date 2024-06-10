import AuthStore from "@/Stores/AuthStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { isAuthenticated } = AuthStore();

  return isAuthenticated ? <Navigate to="/profile" /> : <Outlet />;
};

export default AuthRoutes;
