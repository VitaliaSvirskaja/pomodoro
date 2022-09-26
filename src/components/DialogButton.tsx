import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

export const DialogButton = ({ buttonName, ...buttonProps }: Props) => {
  return (
    <button
      className="w-20 rounded border border-2 p-2 outline-0 hover:shadow focus:ring focus:ring-2 focus:ring-violet-500"
      {...buttonProps}
    >
      {buttonName}
    </button>
  );
};
