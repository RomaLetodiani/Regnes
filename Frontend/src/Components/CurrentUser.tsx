// src/components/CurrentUser.tsx
import React from "react";
import AuthStore from "@/Stores/Auth.Store";
import Avatar from "./Avatar/Avatar";
import { sliceText } from "@/Utils/Helpers";

const CurrentUser: React.FC = () => {
  const { fullUser } = AuthStore();

  return (
    <div className="text-center flex flex-col gap-1 items-center">
      <Avatar
        imageSize="w-20 h-20"
        textSize="text-5xl"
        bgColor="bg-gradient-to-bl from-skyBlue to-oceanBlue"
        username={fullUser?.username}
      />
      <p className="text-sm">Current User</p>
      {fullUser?.username && (
        <h1 className="text-3xl font-bold">{sliceText(fullUser.username, 50)}</h1>
      )}
    </div>
  );
};

export default CurrentUser;
