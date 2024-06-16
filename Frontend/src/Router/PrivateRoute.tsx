import Sockets from "@/Sockets/Sockets";
import AuthStore from "@/Stores/Auth.Store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = AuthStore();
  return isAuthenticated ? (
    <Sockets>
      <Outlet />
    </Sockets>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
