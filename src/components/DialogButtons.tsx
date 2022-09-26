import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
}

export const DialogButtons = ({ buttonName, ...buttonProps }: Props) => {
  return (
    <button className="rounded border-2 w-20 p-2" {...buttonProps}>
      {buttonName}
    </button>
  );
};
