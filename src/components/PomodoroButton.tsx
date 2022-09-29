interface Props {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export const PomodoroButton = ({ label, isActive, onClick }: Props) => (
  <button
    onClick={onClick}
    className={`rounded-full py-4 px-12 font-bold text-white outline-0 hover:bg-primary-dark focus:ring focus:ring-2 focus:ring-primary-light ${
      isActive ? "bg-primary-dark" : "bg-primary"
    }`}
  >
    {label}
  </button>
);
