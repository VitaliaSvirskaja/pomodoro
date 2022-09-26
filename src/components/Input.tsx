import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
}

export function Input({ error, label, ...inputProps }: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={label} className="pl-1 text-sm text-gray-600">
        {label}:
      </label>
      <input
        {...inputProps}
        name={label}
        className={
          "rounded border border-2 py-2 px-3 outline-0 focus:ring focus:ring-2 " +
          (error !== "" ? "focus:ring-red-500" : "focus:ring-violet-500")
        }
      />

      <span className="pl-1 text-xs text-red-600">{error}</span>
    </div>
  );
}
