import Counter from "@/Components/Counter";
import CurrentUser from "@/Components/CurrentUser";
import Button from "@/Components/UI/Button/Button";
import { LOGOUT_MUTATION } from "@/GraphQL/Mutation/Auth.Mutation";
import AuthStore from "@/Stores/Auth.Store";
import GlobalStore from "@/Stores/GlobalStore";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { globalSignInCount, personalSignInCount } = GlobalStore();
  const { clearTokens } = AuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };

  const [logout] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      toast.success("Logged out successfully");
      handleLogout();
    },
    onError: (error) => {
      toast.error(error.message);
      handleLogout();
    },

    context: {
      requiresAuth: true,
    },
  });

  return (
    <div className="w-full h-full text-white flex justify-center items-center">
      <div className="rounded-xl bg-gradient-to-tr shadow-2xl from-oceanBlue to-skyBlue bg-opacity-20 min-w-[350px] flex flex-col gap-2 items-center p-5">
        <CurrentUser />
        <div className="flex w-full flex-col items-center gap-1">
          <h2 className="font-semibold">Sign In Counts</h2>
          <div className="flex w-full gap-5">
            <Counter title="Global" targetNumber={globalSignInCount} />

            <Counter title="Personal" targetNumber={personalSignInCount} />
          </div>
        </div>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </div>
  );
};

export default Profile;
