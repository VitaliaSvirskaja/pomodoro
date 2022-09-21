import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import styles from "./Login.module.css";
import googleLogo from "../assets/googleLogo.png";
import { firebaseAuth, googleAuth } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { API } from "../firebase/API";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, isLoggedIn, user } = useAuthContext();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  function login() {
    logIn(email, password);
  }

  function handleEmailLogin(email: React.ChangeEvent<HTMLInputElement>) {
    setEmail(email.target.value);
  }

  function handlePasswordLogin(password: React.ChangeEvent<HTMLInputElement>) {
    setPassword(password.target.value);
  }

  function handleLoginWithGoogle() {
    if (!user) {
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
    } else {
      console.log("User bereits vorhanden");
    }
  }

  return (
    <div>
      <button onClick={handleLoginWithGoogle}>
        <div className={styles.logInWithGoogle}>
          <img
            src={googleLogo}
            alt="google logo"
            className={styles.googleLogo}
          />
          <p>Login with Google</p>
        </div>
      </button>
      <div>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" onChange={handleEmailLogin} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" onChange={handlePasswordLogin} />
      </div>
      <button onClick={login}>Log in with Email</button>
      <div>
        <a href="">Forgot Password</a>
      </div>
      <div>
        <a href="/register">Create account</a>
      </div>
    </div>
  );
};
