import { ReactNode } from "react";
import SignInCounts from "./SignInCounts";

const Sockets = ({ children }: { children: ReactNode }) => {
  SignInCounts();
  return <>{children}</>;
};

export default Sockets;
