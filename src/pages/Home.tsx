import React, { useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSettingsContext } from "../context/SettingsContext";
import { Timer } from "../components/Timer";
import { Navbar } from "../components/Navbar";
import styles from "./Home.module.css";

type PomodoroType = "Pomodoro" | "Short Break" | "Long Break";

export const Home = () => {
  const { logOut } = useAuthContext();
  const { defaultTimer, isAutoBreakActive, isAutoPomodoroActive } =
    useSettingsContext();
  const [pomodoroTab, setPomodoroTab] = useState<PomodoroType>("Pomodoro");
  const [isPaused, setIsPaused] = useState(true);

  const initialTimer = useMemo(() => {
    if (pomodoroTab === "Pomodoro") {
      return defaultTimer.pomodoro;
    } else if (pomodoroTab === "Short Break") {
      return defaultTimer.shortBreak;
    } else {
      console.log(defaultTimer.longBreak);
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
        // TODO: interval logik implementieren
        setPomodoroTab("Short Break");
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
    <div className={styles.homepage}>
      <Navbar />
      <div>
        <button onClick={logout}>Logout</button>
      </div>

      <button
        className={`${pomodoroTab === "Pomodoro" ? "bg-violet-200" : ""}`}
        onClick={() => {
          togglePomodoroType("Pomodoro");
        }}
      >
        Pomodoro
      </button>
      <button
        className={`${pomodoroTab === "Short Break" ? "bg-violet-200" : ""}`}
        onClick={() => {
          togglePomodoroType("Short Break");
        }}
      >
        Short Break
      </button>
      <button
        className={`${pomodoroTab === "Long Break" ? "bg-violet-200" : ""}`}
        onClick={() => {
          togglePomodoroType("Long Break");
        }}
      >
        Long Break
      </button>
      <Timer
        key={initialTimer + pomodoroTab}
        initialTimer={initialTimer}
        onTimerFinished={handleTimerFinished}
        isPaused={isPaused}
        onPause={() => setIsPaused(true)}
        onStart={() => setIsPaused(false)}
      />
    </div>
  );
};
