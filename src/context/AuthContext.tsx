import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function logIn(email: string, password: string) {
    setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      setFirebaseUser(userCredential.user);
    });
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
      await API.createUserTimerSettings(userCredential.user.uid);
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
