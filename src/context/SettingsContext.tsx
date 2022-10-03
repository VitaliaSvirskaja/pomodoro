import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { API } from "../firebase/API";
import { UserSettings } from "../interfaces/UserSettings";

interface SettingsContext {
  saveSettings: (userSettings: UserSettings) => void;
  defaultTimer: DefaultTimer;
  longBreakInterval: number;
  isAutoBreakActive: boolean;
  isAutoPomodoroActive: boolean;
}

export interface DefaultTimer {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

const settingsContext = React.createContext<SettingsContext>({
  saveSettings: () => undefined,
  defaultTimer: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
  longBreakInterval: 4,
  isAutoBreakActive: false,
  isAutoPomodoroActive: false,
});

export const SettingsContextProvider = (props: PropsWithChildren) => {
  const [defaultTimer, setDefaultTimer] = useState<DefaultTimer>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [isAutoBreakActive, setIsAutoBreakActive] = useState(false);
  const [isAutoPomodoroActive, setIsAutoPomodoroActive] = useState(false);
  const [longBreakInterval, setLongBreakInterval] = useState(4);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      setDefaultTimer({
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
      });
      setIsAutoBreakActive(false);
      setIsAutoPomodoroActive(false);
      setLongBreakInterval(1);
      return;
    }
    const userSettingsRef = doc(firestore, "users", user.uid);
    const unsubscribeSnapshot = onSnapshot(userSettingsRef, (snapshot) => {
      const userTimerPomodoro = snapshot.get("pomodoro");
      const userTimerLongBreak = snapshot.get("longBreak");
      const userTimerShortBreak = snapshot.get("shortBreak");
      const userLongBreakInterval = snapshot.get("longBreakInterval");
      const isAutoBreakActive = snapshot.get("isAutoBreakActive");
      const isAutoPomodoroActive = snapshot.get("isAutoPomodoroActive");
      setDefaultTimer({
        pomodoro: userTimerPomodoro,
        shortBreak: userTimerShortBreak,
        longBreak: userTimerLongBreak,
      });
      setIsAutoBreakActive(isAutoBreakActive);
      setIsAutoPomodoroActive(isAutoPomodoroActive);
      setLongBreakInterval(userLongBreakInterval);
    });

    return () => {
      unsubscribeSnapshot();
    };
  }, [user]);

  async function handleSaveSettings(userSettings: UserSettings) {
    if (user) {
      await API.updateTimerSettings(user.uid, userSettings);
    }
    const {
      isAutoBreakActive,
      isAutoPomodoroActive,
      longBreakInterval,
      ...defaultTimer
    } = userSettings;
    setIsAutoBreakActive(isAutoBreakActive);
    setIsAutoPomodoroActive(isAutoPomodoroActive);
    setLongBreakInterval(longBreakInterval);
    setDefaultTimer(defaultTimer);
  }

  return (
    <settingsContext.Provider
      value={{
        saveSettings: handleSaveSettings,
        defaultTimer: defaultTimer,
        longBreakInterval: longBreakInterval,
        isAutoBreakActive: isAutoBreakActive,
        isAutoPomodoroActive: isAutoPomodoroActive,
      }}
    >
      {props.children}
    </settingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(settingsContext);
};
