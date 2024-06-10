import { InputHTMLAttributes } from "react";
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
        className={twMerge(
          "w-full border outline-none px-3 py-2 rounded-xl",
          label && "pt-5",
          `${hasError && "border-danger"}`,
          inputClassName
        )}
      />
    </div>
  );
};

export default Input;
