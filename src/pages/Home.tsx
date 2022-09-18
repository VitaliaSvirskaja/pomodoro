import React, { useMemo, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useSettingsContext } from "../context/SettingsContext";
import { Timer } from "../components/Timer";

type PomodoroType = "Pomodoro" | "Short Break" | "Long Break";

export const Home = () => {
  const { defaultTimer } = useSettingsContext();
  const [pomodoroTab, setPomodoroTab] = useState<PomodoroType>("Pomodoro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, logIn, user } = useAuthContext();

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

  function createUser() {
    register("test@test.de", "test123");
  }

  function login() {
    logIn(email, password);
  }

  function handleEmailLogin(email: React.ChangeEvent<HTMLInputElement>) {
    setEmail(email.target.value);
  }

  function handlePasswordLogin(password: React.ChangeEvent<HTMLInputElement>) {
    setPassword(password.target.value);
  }

  return (
    <div>
      <div>
        <button onClick={createUser}>Create User</button>
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" onChange={handleEmailLogin} />
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={handlePasswordLogin} />
        <button onClick={login}>Login</button>
      </div>
      <div>{user ? "logged in" : "not logged in"}</div>
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
