import React, { useEffect, useState } from "react";
import { useSettingsContext } from "../context/SettingsContext";

export const TimerSettings = () => {
  const { saveSettings, defaultTimer } = useSettingsContext();
  const [pomodoroTimer, setPomodoroTimer] = useState(defaultTimer.pomodoro);
  const [shortBreakTimer, setShortBreakTimer] = useState(
    defaultTimer.shortBreak
  );
  const [longBreakTimer, setLongBreakTimer] = useState(defaultTimer.longBreak);

  useEffect(() => {
    setPomodoroTimer(defaultTimer.pomodoro);
    setShortBreakTimer(defaultTimer.shortBreak);
    setLongBreakTimer(defaultTimer.longBreak);
  }, [defaultTimer]);

  function changePomodoro(input: React.ChangeEvent<HTMLInputElement>) {
    const newPomodoro = parseInt(input.target.value);
    setPomodoroTimer(newPomodoro);
  }

  function changeShortBreak(input: React.ChangeEvent<HTMLInputElement>) {
    const newShortBreak = parseInt(input.target.value);
    setShortBreakTimer(newShortBreak);
  }

  function changeLongBreak(input: React.ChangeEvent<HTMLInputElement>) {
    const newLongBreak = parseInt(input.target.value);
    setLongBreakTimer(newLongBreak);
  }

  function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSettings(pomodoroTimer, shortBreakTimer, longBreakTimer);
  }

  return (
    <div style={{ backgroundColor: "lightpink" }}>
      <button>Settings</button>
      <form onSubmit={handleSaveSettings}>
        <label htmlFor="pomodoro">Pomodoro:</label>
        <input
          type="number"
          name="pomodoro"
          onChange={changePomodoro}
          value={pomodoroTimer}
        />
        <label htmlFor="short break">Short Break:</label>
        <input
          type="number"
          name="short break"
          onChange={changeShortBreak}
          value={shortBreakTimer}
        />
        <label htmlFor="long break">Long Break:</label>
        <input
          type="number"
          name="long break"
          onChange={changeLongBreak}
          value={longBreakTimer}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
