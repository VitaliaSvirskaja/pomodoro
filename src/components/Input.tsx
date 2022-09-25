import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export function Input({ label, ...inputProps }: Props) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <label htmlFor={label}>{label}:</label>
      <input
        {...inputProps}
        name={label}
        className="w-20 rounded border-2 p-1"
      />
    </div>
  );
}
