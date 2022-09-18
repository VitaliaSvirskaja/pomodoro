import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

async function createUserTimerSettings(userID: string) {
  const userRef = doc(db, "users", userID);
  await setDoc(userRef, { pomodoro: 25, shortBreak: 5, longBreak: 15 });
}

async function updateTimerSettings(
  userID: string,
  pomodoro: number,
  shortBreak: number,
  longBreak: number
) {
  const userRef = doc(db, "users", userID);
  await updateDoc(userRef, {
    pomodoro: pomodoro,
    shortBreak: shortBreak,
    longBreak: longBreak,
  });
}

export const API = {
  createUserTimerSettings: createUserTimerSettings,
  updateTimerSettings: updateTimerSettings,
};
