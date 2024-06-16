import { Navigate, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthRoutes from "./AuthRoutes";
import { lazy } from "react";

const Profile = lazy(() => import("@/Pages/Profile/Profile"));
const Login = lazy(() => import("@/Pages/Auth/Login"));
const Register = lazy(() => import("@/Pages/Auth/Register"));
const Error = lazy(() => import("@/Pages/Error/Error"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/profile" />,
  },
  {
    element: <AuthRoutes />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
