import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { create } from "zustand";

type DecodedUser = {
  id: string;
  username: string;
  iat: number;
  exp: number;
};

type FullUser = {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  password: string;
  refreshToken: string;
  signInCount: number;
};

interface IAuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  decodedUser: DecodedUser | null;
  fullUser: FullUser | null;
  setFullUser: (user: any) => void;
  setTokens: ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => void;
  clearTokens: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthStore = create<IAuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  decodedUser: null,
  fullUser: null,
  setFullUser: (user) => set({ fullUser: user, refreshToken: user.refreshToken }),
  setTokens: ({ accessToken, refreshToken }) => {
    if (!accessToken || !refreshToken) {
      toast.error("Invalid Access token");
      AuthStore.getState().clearTokens();
    }
    let decodedAccessToken;
    try {
      decodedAccessToken = jwtDecode(accessToken);
    } catch (error) {
      toast.error("Invalid access token");
      AuthStore.getState().clearTokens();
    }
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      decodedUser: decodedAccessToken as DecodedUser,
    });
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null, isAuthenticated: false });
  },
  isAuthenticated: false,
  loading: false,
  error: null,
}));

export default AuthStore;

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

if (refreshToken) {
  AuthStore.setState({ refreshToken });
}

if (accessToken && refreshToken) {
  AuthStore.getState().setTokens({ accessToken, refreshToken });
}
