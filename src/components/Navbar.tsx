import { TimerSettings } from "./TimerSettings";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { DropdownMenu } from "./DropdownMenu";

export const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  function handleLoginClick() {
    return navigate("/login");
  }

  return (
    <div className="flex justify-between">
      {/* TODO: replace with real logo */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 text-white hover:cursor-pointer "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <div className="flex gap-2">
        <TimerSettings />
        {user ? (
          <DropdownMenu />
        ) : (
          <button
            className="text-xl font-bold text-white
          "
            onClick={handleLoginClick}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
