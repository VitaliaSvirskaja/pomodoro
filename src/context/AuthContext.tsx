import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;
import React, { PropsWithChildren, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase";
import { API } from "../firebase/API";

interface AuthContext {
  user: UserInfo | null;
  isLoggedIn: boolean;
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  register: (email: string, password: string) => void;
}

const authContext = React.createContext<AuthContext>({
  user: null,
  isLoggedIn: false,
  logIn: () => undefined,
  logOut: () => undefined,
  register: () => undefined,
});

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [firebaseUser, setFirebaseUser] = useState<UserInfo | null>(null);

  async function logIn(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    setFirebaseUser(userCredential.user);
  }

  async function logOut() {
    await firebaseAuth.signOut();
    setFirebaseUser(null);
  }

  async function register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log("created");
      setFirebaseUser(userCredential.user);
      console.log("userCredentials were set");
      await API.createUserTimerSettings(userCredential.user.uid);
      console.log("timer settings were set");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <authContext.Provider
      value={{
        user: firebaseUser,
        isLoggedIn: !!firebaseUser,
        logIn: logIn,
        logOut: logOut,
        register: register,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(authContext);
};
