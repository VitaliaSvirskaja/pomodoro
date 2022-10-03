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

  function login(event: React.FormEvent) {
    event.preventDefault();
    logIn(email, password);
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
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-home-background bg-cover">
      {/* TODO Logo ergänzen */}
      <div className="text-center">Pomoplatzhalter</div>
      <h1 className="text-center text-2xl font-bold tracking-widest text-primary-dark">
        Login
      </h1>
      <div className="flex w-full max-w-lg flex-col gap-8 rounded-lg bg-white py-10">
        <div className="px-14">
          <button
            onClick={handleLoginWithGoogle}
            className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-2 border-gray-50 px-4 py-6 shadow-lg transition-shadow hover:shadow-xl"
          >
            <img src={googleLogo} alt="google logo" className="h-8" />
            <p className="text-lg font-semibold text-primary-dark">
              Log in with Google
            </p>
          </button>
        </div>

        <div className="flex w-full items-center justify-evenly gap-2">
          <div className="flex-1 border-t border-primary"></div>
          <p className="text-sm font-semibold text-primary">or</p>
          <div className="flex-1 border-t border-primary"></div>
        </div>
        {/* TODO: Formvalidierung implementieren */}
        <form className="flex flex-col gap-6 px-14" onSubmit={login}>
          <Input
            label="EMAIL"
            type={"email"}
            variant={"filled"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="PASSWORD"
            type={"password"}
            variant={"filled"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3 font-semibold tracking-widest text-white transition-colors hover:bg-primary-dark"
          >
            Log in with Email
          </button>
        </form>
        {/* TODO Link für Passwort zurücksetzen ergänzen */}
        <a
          href=""
          className="text-center font-semibold text-primary-dark underline underline-offset-2"
        >
          Forgot Password
        </a>
      </div>

      <div className="text-center text-primary-dark">
        <p className="text-lg">Don't have an account?</p>
        <a href="/register" className="font-semibold underline">
          Create account
        </a>
      </div>
    </div>
  );
};
