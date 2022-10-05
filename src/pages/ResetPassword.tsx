import { Input } from "../components/Input";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase";
import { Snackbar } from "../components/Snackbar";

interface Inputs {
  email: string;
}

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({ mode: "all" });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.email);
    resetPassword(data.email);
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setIsSnackbarOpen(false);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, [setIsSnackbarOpen]);

  function resetPassword(email: string) {
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        setIsSnackbarOpen(true);
      })
      .catch(() => {
        setError("email", { message: "User not found." });
      });
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-home-background bg-cover">
      {/* TODO Logo ergänzen */}
      <div className="text-center">Pomoplatzhalter</div>
      <h1 className="text-center text-2xl font-bold tracking-widest text-primary-dark">
        Reset password
      </h1>
      <div className="flex w-full max-w-lg flex-col gap-8 rounded-lg bg-white py-10">
        <div className="px-14  text-primary-dark">
          <h2 className="text-lg font-semibold">Reset your password</h2>
          <p>
            Enter the email address linked to your ... account, and we’ll send
            you a reset link.
          </p>
        </div>

        <form
          className="flex flex-col gap-8 px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="EMAIL"
            type={"email"}
            variant={"filled"}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^([a-zA-Z0-9%+-.]+)@([a-zA-Z0-9.]+)\.([a-zA-Z]{2,5})$/,
                message: "Please enter a valid email.",
              },
            })}
            error={errors.email?.message}
          />

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3.5 font-semibold tracking-widest text-white transition-colors hover:bg-primary-dark"
          >
            Get reset link
          </button>
        </form>
        <Link
          to="/login"
          className="px-14 text-base font-semibold text-primary"
        >
          Back to login
        </Link>
        <div className="border-t border-primary"></div>
        <div className="text-center text-primary-dark">
          <p className="text-md  font-semibold">Don't have an account?</p>
          <Link className="text-sm underline" to="/register">
            Create account
          </Link>
        </div>
      </div>
      {isSnackbarOpen && <Snackbar />}
    </div>
  );
};
