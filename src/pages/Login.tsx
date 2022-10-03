import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import googleLogo from "../assets/googleLogo.png";
import { firebaseAuth, googleAuth } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { API } from "../firebase/API";
import { Navigate } from "react-router-dom";
import { Input } from "../components/Input";

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
    <div className="flex h-screen flex-col bg-home-background bg-cover">
      <div className="text-center">Pomoplatzhalter</div>
      <h1 className="text-center text-2xl font-bold text-primary-dark">
        Login
      </h1>
      <div className="m-auto flex w-full max-w-lg flex-col gap-2 rounded-lg bg-white py-10">
        <div className="px-14">
          <button
            onClick={handleLoginWithGoogle}
            className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-2 border-gray-50 px-4 py-6 shadow-lg transition-shadow hover:shadow-xl"
          >
            <img src={googleLogo} alt="google logo" className="h-8" />
            <p className="text-base font-semibold text-primary-dark">
              Login with Google
            </p>
          </button>
        </div>

        <div className="flex w-full items-center justify-evenly gap-1">
          <div className="flex-1 border-t border-primary"></div>
          <p className="text-xs text-primary">or</p>
          <div className="flex-1 border-t border-primary"></div>
        </div>

        <div className="flex flex-col px-14">
          <Input
            label="Email"
            type={"email"}
            variant={"filled"}
            onChange={handleEmailLogin}
          />
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" onChange={handleEmailLogin} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordLogin}
            />
          </div>
          <button
            className="w-full rounded-md bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            onClick={login}
          >
            Log in with Email
          </button>
        </div>
        <a
          href=""
          className="text-center text-sm font-semibold text-primary-dark underline underline-offset-2"
        >
          Forgot Password
        </a>
      </div>
      <div>
        <a href="/register">Create account</a>
      </div>
    </div>
  );
};
