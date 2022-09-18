import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { API } from "../firebase/API";

interface SettingsContext {
  saveSettings: (
    pomodoro: number,
    shortBreak: number,
    longBreak: number
  ) => void;
  defaultTimer: DefaultTimer;
}

export interface DefaultTimer {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

const settingsContext = React.createContext<SettingsContext>({
  saveSettings: () => undefined,
  defaultTimer: { pomodoro: 25, shortBreak: 5, longBreak: 15 },
});

export const SettingsContextProvider = (props: PropsWithChildren) => {
  const [defaultTimer, setDefaultTimer] = useState<DefaultTimer>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchTimer() {
      if (!user) {
        setDefaultTimer({
          pomodoro: 25,
          shortBreak: 5,
          longBreak: 15,
        });
      } else {
        const userRef = doc(db, "users", user?.uid);
        const userDoc = await getDoc(userRef);
        const userTimerPomodoro = userDoc.get("pomodoro");
        const userTimerLongBreak = userDoc.get("longBreak");
        const userTimerShortBreak = userDoc.get("shortBreak");
        setDefaultTimer({
          pomodoro: userTimerPomodoro,
          shortBreak: userTimerShortBreak,
          longBreak: userTimerLongBreak,
        });
      }
    }
    fetchTimer();
  }, [user]);

  async function handleSaveSettings(
    pomodoro: number,
    shortBreak: number,
    longBreak: number
  ) {
    if (!user) {
      setDefaultTimer({
        pomodoro: pomodoro,
        shortBreak: shortBreak,
        longBreak: longBreak,
      });
    } else {
      await API.updateTimerSettings(user.uid, pomodoro, shortBreak, longBreak);
    }
  }

  return (
    <settingsContext.Provider
      value={{
        saveSettings: handleSaveSettings,
        defaultTimer: defaultTimer,
      }}
    >
      {props.children}
    </settingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(settingsContext);
};
