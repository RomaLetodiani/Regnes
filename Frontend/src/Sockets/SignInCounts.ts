import GlobalStore from "@/Stores/GlobalStore";
import { useEffect } from "react";
import { socket } from "./Socket";
import AuthStore from "@/Stores/Auth.Store";
import { toast } from "react-toastify";

const SignInCounts = () => {
  const { setGlobalSignInCount, setPersonalSignInCount } = GlobalStore();
  const { isAuthenticated, accessToken } = AuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    socket.auth = { token: accessToken };
    socket.connect();

    const handlePersonalSignInCount = (count: number) => {
      setPersonalSignInCount(count);
    };

    const handleGlobalSignInCount = (count: number) => {
      setGlobalSignInCount(count);
    };

    const handleFifthLoginNotification = () => {
      toast.success("5 more users have logged in!");
    };

    // Remove previous listeners to prevent duplication
    socket.off("personalSignInCount", handlePersonalSignInCount);
    socket.off("globalUserSignInCount", handleGlobalSignInCount);
    socket.off("fifthLoginNotification", handleFifthLoginNotification);

    // Add event listeners
    socket.on("personalSignInCount", handlePersonalSignInCount);
    socket.on("globalUserSignInCount", handleGlobalSignInCount);
    socket.on("fifthLoginNotification", handleFifthLoginNotification);

    return () => {
      // Clean up listeners on component unmount
      socket.off("personalSignInCount", handlePersonalSignInCount);
      socket.off("globalUserSignInCount", handleGlobalSignInCount);
      socket.off("fifthLoginNotification", handleFifthLoginNotification);
      socket.disconnect();
    };
  }, [isAuthenticated]);
};

export default SignInCounts;
