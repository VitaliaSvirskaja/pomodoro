import { useAuthContext } from "../context/AuthContext";
import React from "react";

interface Props {}

export const Register = (props: Props) => {
  const { register } = useAuthContext();
  function createUser() {
    register("test@test.de", "test123");
  }
  return (
    <div>
      <button onClick={createUser}>Create User</button>
    </div>
  );
};
