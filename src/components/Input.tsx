import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  variant?: "filled";
}

export function Input({ error, label, variant, ...inputProps }: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label
        htmlFor={label}
        className={`${
          variant === "filled"
            ? "font-semibold tracking-wider text-primary-dark"
            : ""
        }`}
      >
        {label}
      </label>
      <input
        {...inputProps}
        name={label}
        className={
          "rounded border border-2 py-2 px-3 outline-0 focus:ring focus:ring-2" +
          " " +
          (error !== "" ? "focus:ring-red-500" : "focus:ring-violet-500") +
          " " +
          (variant === "filled" ? "bg-gray-200" : "")
        }
      />

      <span className="pl-1 text-xs text-red-600">{error}</span>
    </div>
  );
}
