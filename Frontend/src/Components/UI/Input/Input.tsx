import { InputHTMLAttributes, useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export interface inputI extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  errorMessage?: string;
  hasError?: boolean;
  focus?: boolean;
}

const Input = ({
  label,
  labelClassName,
  inputClassName,
  wrapperClassName,
  errorMessage,
  hasError,
  focus,
  ...rest
}: inputI) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = rest.type === "password";
  return (
    <div className={twMerge("relative w-full", wrapperClassName)}>
      <label
        htmlFor={rest.id}
        className={twMerge(
          "absolute left-3 pointer-events-none transition-all",
          `${
            focus
              ? "top-1 text-sm text-primary"
              : "transform top-1/2 -translate-y-1/2 text-secondary-200"
          }`,
          hasError && "text-danger",
          labelClassName
        )}
      >
        {hasError ? errorMessage : label}
      </label>
      <input
        {...rest}
        type={isPassword ? (passwordVisible ? "text" : "password") : rest.type}
        className={twMerge(
          "w-full border outline-none px-3 py-2 rounded-xl",
          label && "pt-5",
          hasError && "border-danger",
          isPassword && "pr-14",
          inputClassName
        )}
      />
      {isPassword && (
        <div
          className={twMerge(
            "absolute cursor-pointer right-0 top-0 text-xl flex justify-center items-center w-[50px] h-[50px]",
            focus ? "text-primary" : "text-secondary-200",
            hasError && "text-error"
          )}
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          {passwordVisible ? <MdOutlineRemoveRedEye /> : <GoEyeClosed />}
        </div>
      )}
    </div>
  );
};

export default Input;
