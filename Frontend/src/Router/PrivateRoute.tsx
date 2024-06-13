import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // !TODO: Implement authentication logic
  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
