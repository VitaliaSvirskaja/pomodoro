import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";
import { UserSettings } from "../interfaces/UserSettings";

async function createUserTimerSettings(userID: string) {
  const userRef = doc(firestore, "users", userID);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return;
  }
  await setDoc(userRef, { pomodoro: 25, shortBreak: 5, longBreak: 15 });
}

async function updateTimerSettings(userID: string, userSettings: UserSettings) {
  const userRef = doc(firestore, "users", userID);
  await updateDoc(userRef, {
    ...userSettings,
  });
}

export const API = {
  createUserTimerSettings: createUserTimerSettings,
  updateTimerSettings: updateTimerSettings,
};
