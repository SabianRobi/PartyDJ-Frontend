// @flow
import * as React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  email: string;
  username: string;
  password: string;
};

export default function Register() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await axios
      .post("http://localhost:8080/api/v1/user", JSON.stringify(data), {
        headers: {
          // 'XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          "Content-Type": "application/json",
        },
      })
      .catch((reason) => {
        console.error(reason.response.data);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className={"text-center font-bold text-xl"}>Register</h2>
        <div className={"mb-2"}>
          <label htmlFor="email">Email</label>
          <input
            className={"text-black p-1 text-center"}
            type={"email"}
            id={"email"}
            {...register("email")}
          />
        </div>
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
            type={"password"}
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
