interface Props {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export const PomodoroButton = ({ label, isActive, onClick }: Props) => (
  <button
    onClick={onClick}
    className={`rounded-full py-2.5 px-9 font-bold text-white hover:bg-primary-dark ${
      isActive ? "bg-primary-dark" : "bg-primary"
    }`}
  >
    {label}
  </button>
);
