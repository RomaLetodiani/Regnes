import AuthStore from "@/Stores/Auth.Store";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const { isAuthenticated } = AuthStore();

  return isAuthenticated ? <Navigate to="/profile" /> : <Outlet />;
};

export default AuthRoutes;
