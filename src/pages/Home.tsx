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
    <div className="flex h-screen flex-col bg-home-background bg-cover">
      <div className="m-auto w-full max-w-5xl rounded-xl bg-primary bg-opacity-30 py-12 px-16 backdrop-blur-md">
        <Navbar />
        <div>
          <button onClick={logout}>Logout</button>
        </div>

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
      </div>
    </div>
  );
};
