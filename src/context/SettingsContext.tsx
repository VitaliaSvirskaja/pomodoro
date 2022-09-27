import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { API } from "../firebase/API";
import { UserSettings } from "../interfaces/UserSettings";

interface SettingsContext {
  saveSettings: (userSettings: UserSettings) => void;
  defaultTimer: DefaultTimer;
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
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchSettings() {
      if (!user) {
        setDefaultTimer({
          pomodoro: 25,
          shortBreak: 5,
          longBreak: 15,
        });
      } else {
        const userRef = doc(firestore, "users", user?.uid);
        const userDoc = await getDoc(userRef);
        const userTimerPomodoro = userDoc.get("pomodoro");
        const userTimerLongBreak = userDoc.get("longBreak");
        const userTimerShortBreak = userDoc.get("shortBreak");
        const isAutoBreakActive = userDoc.get("isAutoBreakActive");
        const isAutoPomodoroActive = userDoc.get("isAutoPomodoroActive");
        setDefaultTimer({
          pomodoro: userTimerPomodoro,
          shortBreak: userTimerShortBreak,
          longBreak: userTimerLongBreak,
        });
        setIsAutoBreakActive(isAutoBreakActive);
        setIsAutoPomodoroActive(isAutoPomodoroActive);
      }
    }
    fetchSettings();
  }, [user]);

  async function handleSaveSettings(userSettings: UserSettings) {
    if (user) {
      await API.updateTimerSettings(user.uid, userSettings);
    }
    const { isAutoBreakActive, isAutoPomodoroActive, ...defaultTimer } =
      userSettings;
    setIsAutoBreakActive(isAutoBreakActive);
    setIsAutoPomodoroActive(isAutoPomodoroActive);
    setDefaultTimer(defaultTimer);
  }

  return (
    <settingsContext.Provider
      value={{
        saveSettings: handleSaveSettings,
        defaultTimer: defaultTimer,
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
