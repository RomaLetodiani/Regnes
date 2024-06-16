import { GET_CURRENT_USER } from "@/GraphQL/Query/User.Queries";
import Loading from "@/Pages/Loading/Loading";
import Sockets from "@/Sockets/Sockets";
import AuthStore from "@/Stores/Auth.Store";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const { isAuthenticated, setFullUser, clearTokens } = AuthStore();
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    context: {
      requiresAuth: true,
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
      toast.error(error.message);
    },
  });
  useEffect(() => {
    if (data) {
      setFullUser(data.CurrentUser);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  return isAuthenticated || !error ? (
    <Sockets>
      <Outlet />
    </Sockets>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
