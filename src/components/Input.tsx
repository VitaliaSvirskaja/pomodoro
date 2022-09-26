import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
}
export function Input({ error, label, ...inputProps }: Props) {
  return (
    <div className="flex flex-col items-center gap-0 justify-between h-28">
      <div className="flex flex-col items-center gap-4 justify-between">
        <label htmlFor={label}>{label}:</label>
        <input
          {...inputProps}
          name={label}
          className={
            "w-24 rounded border-2 p-1 " +
            (error !== "" ? "border-red-600" : "")
          }
        />
      </div>
      <div>
        <span className="text-xs text-red-600">{error}</span>
      </div>
    </div>
  );
}
