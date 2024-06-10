import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { create } from "zustand";

interface IAuthStore {
  accessToken: string | null;
  user: any; // TODO: Define user type
  setToken: ({ accessToken }: { accessToken: string }) => void;
  clearTokens: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthStore = create<IAuthStore>((set) => ({
  accessToken: null,
  user: null,
  setToken: ({ accessToken }) => {
    if (!accessToken) {
      toast.error("Invalid Access token");
      return set({ accessToken: null, isAuthenticated: false });
    }
    let decodedAccessToken;
    try {
      decodedAccessToken = jwtDecode(accessToken);
    } catch (error) {
      toast.error("Invalid access token");
      return set({ accessToken: null, isAuthenticated: false });
    }

    set({ accessToken, isAuthenticated: true, user: decodedAccessToken });
  },
  clearTokens: () => set({ accessToken: null, isAuthenticated: false }),
  isAuthenticated: false,
  loading: false,
  error: null,
}));

export default AuthStore;
