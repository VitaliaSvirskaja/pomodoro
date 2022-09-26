import { Switch } from "@headlessui/react";

interface Props {
  label: string;
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

export const Toggle = ({ label, isActive, onToggle }: Props) => (
  <div className="flex w-full justify-between gap-3 px-1">
    <label htmlFor={label}>{label}</label>
    <Switch
      id={label}
      checked={isActive}
      onChange={onToggle}
      className={`${
        isActive ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`${
          isActive ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  </div>
);
