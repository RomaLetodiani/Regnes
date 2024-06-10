import { Navigate, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "@/Pages/Profile/Profile";
import AuthRoutes from "./AuthRoutes";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import Error from "@/Pages/Error/Error";

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
