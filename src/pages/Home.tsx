import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSettingsContext } from "../context/SettingsContext";
import { Timer } from "../components/Timer";
import { Navbar } from "../components/Navbar";
import { PomodoroButton } from "../components/PomodoroButton";
type PomodoroType = "Pomodoro" | "Short Break" | "Long Break";

export const Home = () => {
  const { logOut } = useAuthContext();
  const {
    defaultTimer,
    isAutoBreakActive,
    isAutoPomodoroActive,
    longBreakInterval,
  } = useSettingsContext();
  const [pomodoroTab, setPomodoroTab] = useState<PomodoroType>("Pomodoro");
  const [isPaused, setIsPaused] = useState(true);
  const [remainingShortBreaks, setRemainingShortBreaks] = useState(
    longBreakInterval - 1
  );

  useEffect(() => {
    setRemainingShortBreaks(longBreakInterval - 1);
  }, [longBreakInterval]);

  const initialTimer = useMemo(() => {
    if (pomodoroTab === "Pomodoro") {
      return defaultTimer.pomodoro;
    } else if (pomodoroTab === "Short Break") {
      return defaultTimer.shortBreak;
    } else {
      return defaultTimer.longBreak;
    }
  }, [pomodoroTab, defaultTimer]);

  function togglePomodoroType(pomodoroType: PomodoroType) {
    setPomodoroTab(pomodoroType);
  }

  function logout() {
    logOut();
  }

  function handleTimerFinished() {
    switch (pomodoroTab) {
      case "Pomodoro":
        if (remainingShortBreaks > 0) {
          setPomodoroTab("Short Break");
          setRemainingShortBreaks(remainingShortBreaks - 1);
        } else {
          setPomodoroTab("Long Break");
          setRemainingShortBreaks(longBreakInterval - 1);
        }
        if (!isAutoBreakActive) {
          setIsPaused(true);
        }
        break;
      case "Short Break":
        setPomodoroTab("Pomodoro");
        if (!isAutoPomodoroActive) {
          setIsPaused(true);
        }
        break;
      case "Long Break":
        setPomodoroTab("Pomodoro");
        if (!isAutoPomodoroActive) {
          setIsPaused(true);
        }
        break;
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-home-background bg-cover px-28 py-16">
      <div className="w-full max-w-5xl rounded-xl bg-primary bg-opacity-30 py-12 px-16 backdrop-blur-md">
        <Navbar />
        <div>
          <button onClick={logout}>Logout</button>
        </div>

        <div className="flex flex-col gap-16">
          <div className="flex justify-center gap-8">
            <PomodoroButton
              label="Pomodoro"
              onClick={() => togglePomodoroType("Pomodoro")}
              isActive={pomodoroTab === "Pomodoro"}
            />

            <PomodoroButton
              label="Short Break"
              onClick={() => togglePomodoroType("Short Break")}
              isActive={pomodoroTab === "Short Break"}
            />
            <PomodoroButton
              label="Long Break"
              onClick={() => togglePomodoroType("Long Break")}
              isActive={pomodoroTab === "Long Break"}
            />
          </div>
          <Timer
            key={initialTimer + pomodoroTab}
            initialTimer={initialTimer}
            onTimerFinished={handleTimerFinished}
            isPaused={isPaused}
            onPause={() => setIsPaused(true)}
            onStart={() => setIsPaused(false)}
          />

          <button className="m-auto flex w-fit gap-1 rounded-full border border-2 border-dashed border-primary-light bg-primary py-4 px-8 font-semibold text-primary-light outline-0 hover:bg-primary-dark focus:border-primary-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};
