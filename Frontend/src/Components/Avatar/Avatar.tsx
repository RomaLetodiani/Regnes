import { twMerge } from "tailwind-merge";

type avatarProps = {
  username?: string;
  imageSize?: "w-10 h-10" | "w-12 h-12" | "w-14 h-14" | "w-16 h-16" | "w-20 h-20";
  bgColor?: string;
  textColor?: string;
  textSize?: string;
};

const Avatar = ({
  username,
  imageSize = "w-10 h-10",
  bgColor = "bg-primary",
  textColor = "text-white",
  textSize = "text-2xl",
}: avatarProps) => {
  return (
    <div className="flex gap-3">
      <div
        className={twMerge(
          "relative border rounded-full ",
          imageSize,
          bgColor,
          textColor,
          textSize
        )}
      >
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          {username?.slice(0, 1).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default Avatar;
