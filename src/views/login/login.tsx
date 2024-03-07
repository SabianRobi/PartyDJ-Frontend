import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    await axios
      .post("http://localhost:8080/api/v1/auth/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((reason) => {
        console.error(reason);
      })
      .then((resp) => console.log(resp));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={"text-center font-bold text-xl"}>Login</h2>
        <div className={"mb-2"}>
          <label htmlFor="username">Username</label>
          <input
            className={"text-black p-1 text-center"}
            type={"text"}
            id={"username"}
            {...register("username")}
          />
        </div>
        <div className={"mb-2"}>
          <label htmlFor="password">Password</label>
          <input
            className={"text-black p-1 text-center"}
            type={"text"}
            id={"password"}
            {...register("password")}
          />
        </div>

        <input
          type={"submit"}
          className={"bg-lime-600 rounded p-2 text-center"}
        />
      </form>
    </div>
  );
}
