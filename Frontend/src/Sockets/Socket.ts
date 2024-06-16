import { io } from "socket.io-client";

const URL: string =
  import.meta.env.VITE_ENV === "production" ? import.meta.env.VITE_WS_URL : "ws://localhost:4000";

export const socket = io(URL, {
  autoConnect: false,
});
