import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

async function createUserTimerSettings(userID: string) {
  const userRef = doc(firestore, "users", userID);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return;
  }
  await setDoc(userRef, { pomodoro: 25, shortBreak: 5, longBreak: 15 });
}

async function updateTimerSettings(
  userID: string,
  pomodoro: number,
  shortBreak: number,
  longBreak: number
) {
  const userRef = doc(firestore, "users", userID);
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
