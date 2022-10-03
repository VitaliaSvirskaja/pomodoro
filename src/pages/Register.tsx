import React from "react";

import { useAuthContext } from "../context/AuthContext";
import googleLogo from "../assets/googleLogo.png";
import { Input } from "../components/Input";
import { API } from "../firebase/API";
import { Navigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const Register = () => {
  const { register: registerUser, isLoggedIn } = useAuthContext();

  const { register, handleSubmit, watch } = useForm<Inputs>();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  function handleRegisterWithGoogle() {
    API.signInWithGoogle();
  }

  console.log(watch("email"));

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    // registerUser(data.email, data.password);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-home-background bg-cover">
      {/* TODO Logo ergänzen */}
      <div className="text-center">Pomoplatzhalter</div>
      <h1 className="text-center text-2xl font-bold tracking-widest text-primary-dark">
        Sign up
      </h1>
      <div className="flex w-full max-w-lg flex-col gap-8 rounded-lg bg-white py-10">
        <div className="px-14">
          <button
            onClick={handleRegisterWithGoogle}
            className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-2 border-gray-50 px-4 py-6 shadow-lg transition-shadow hover:shadow-xl"
          >
            <img src={googleLogo} alt="google logo" className="h-8" />
            <p className="text-lg font-semibold text-primary-dark">
              Sign up with Google
            </p>
          </button>
        </div>

        <div className="flex w-full items-center justify-evenly gap-2">
          <div className="flex-1 border-t border-primary"></div>
          <p className="text-sm font-semibold text-primary">or</p>
          <div className="flex-1 border-t border-primary"></div>
        </div>

        {/* TODO: Formvalidierung implementieren */}
        <form
          className="flex flex-col gap-6 px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="EMAIL"
            type={"email"}
            variant={"filled"}
            {...register("email")}

            // error={
            //   email === "" && wasEmailFocussed
            //     ? "E-Mail address may not be empty."
            //     : undefined
            // }
            // onBlur={() => {
            //   setWasEmailFocussed(true);
            // }}
          />
          <Input
            label="PASSWORD"
            type={"password"}
            variant={"filled"}
            {...register("password")}
            // error={
            //   password === "" && wasPasswordFocused
            //     ? "Password may not be empty."
            //     : undefined
            // }
            // onBlur={() => {
            //   setWasPasswordFocused(true);
            // }}
          />
          <Input
            label="REPEAT PASSWORD"
            type={"password"}
            variant={"filled"}
            {...register("repeatPassword")}
            // error={
            //   repeatPassword !== password &&
            //   password !== "" &&
            //   wasPasswordRepeatFocused
            //     ? "Passwords don't match."
            //     : undefined
            // }
            // onBlur={() => {
            //   setWasPasswordRepeatFocused(true);
            // }}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3.5 font-semibold tracking-widest text-white transition-colors hover:bg-primary-dark"
          >
            Sign up with Email
          </button>
        </form>
      </div>
    </div>
  );
};
