import React, { useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSettingsContext } from "../context/SettingsContext";
import { Timer } from "../components/Timer";
import { Navbar } from "../components/Navbar";
import styles from "./Home.module.css";

type PomodoroType = "Pomodoro" | "Short Break" | "Long Break";

export const Home = () => {
  const { logOut } = useAuthContext();
  const { defaultTimer } = useSettingsContext();
  const [pomodoroTab, setPomodoroTab] = useState<PomodoroType>("Pomodoro");

  const initialTimer = useMemo(() => {
    if (pomodoroTab === "Pomodoro") {
      console.log("Pomodoro");
      return defaultTimer.pomodoro;
    } else if (pomodoroTab === "Short Break") {
      console.log("Short Break");
      return defaultTimer.shortBreak;
    } else {
      console.log("Long Break");
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

  return (
    <div className={styles.homepage}>
      <Navbar />
      <div>
        <button onClick={logout}>Logout</button>
      </div>

      <button
        onClick={() => {
          togglePomodoroType("Pomodoro");
        }}
      >
        Pomodoro
      </button>
      <button
        onClick={() => {
          togglePomodoroType("Short Break");
        }}
      >
        Short Break
      </button>
      <button
        onClick={() => {
          togglePomodoroType("Long Break");
        }}
      >
        Long Break
      </button>
      <Timer key={initialTimer} initialTimer={initialTimer} />
    </div>
  );
};
