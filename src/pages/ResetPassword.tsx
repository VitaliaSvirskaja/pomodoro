import { Input } from "../components/Input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface Inputs {
  email: string;
}

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "all" });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data.email);
  };

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
            Enter the email address linked to your Zalando account, and we’ll
            send you a reset link.
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
            {...register("email", { required: "Email is required." })}
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
    </div>
  );
};
