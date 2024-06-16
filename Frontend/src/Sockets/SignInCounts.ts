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

    socket.on("roomId", (roomId) => {
      socket.emit("joinRoom", roomId);
    });

    socket.on("personalSignInCount", (count) => {
      setPersonalSignInCount(count);
    });

    // Handle globalSignInCount event from server
    socket.on("globalUserSignInCount", (count) => {
      setGlobalSignInCount(count);
    });

    socket.on("fifthLoginNotification", () => {
      toast.success("5 More Users have signed in!");
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);
};

export default SignInCounts;