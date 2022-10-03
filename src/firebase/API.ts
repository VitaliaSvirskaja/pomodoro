import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

import { firebaseAuth, firestore, googleAuth } from "./firebase";
import { UserSettings } from "../interfaces/UserSettings";

async function createUserTimerSettings(userID: string) {
  const userRef = doc(firestore, "users", userID);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return;
  }
  const defaultSettings: UserSettings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    isAutoBreakActive: false,
    isAutoPomodoroActive: false,
  };
  await setDoc(userRef, defaultSettings);
}

async function updateTimerSettings(userID: string, userSettings: UserSettings) {
  const userRef = doc(firestore, "users", userID);
  await updateDoc(userRef, {
    ...userSettings,
  });
}

async function signInWithGoogle() {
  signInWithPopup(firebaseAuth, googleAuth)
    .then((result) => {
      const user = result.user;

      API.createUserTimerSettings(user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode + errorMessage);

      // TODO Kollision zwischen Google Login und Email Login bearbeiten
    });
}

export const API = {
  createUserTimerSettings: createUserTimerSettings,
  updateTimerSettings: updateTimerSettings,
  signInWithGoogle: signInWithGoogle,
};
