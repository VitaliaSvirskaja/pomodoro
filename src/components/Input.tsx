import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "filled";
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ error, label, variant, ...inputProps }, ref) => (
    <div className="flex w-full flex-col gap-1">
      <label
        htmlFor={inputProps.name}
        className={`${
          variant === "filled"
            ? "font-semibold tracking-wider text-primary-dark"
            : ""
        }`}
      >
        {label}
      </label>
      <input
        ref={ref}
        {...inputProps}
        className={`rounded border border-2 py-3 px-3 outline-0 focus:ring focus:ring-2 ${
          error === undefined
            ? "focus:ring-violet-500"
            : "ring ring-2 ring-red-500"
        } ${variant === "filled" ? "bg-gray-100" : ""}`}
      />

      <span className="pl-1 text-xs text-red-600">{error}</span>
    </div>
  )
);
