import * as React from "react";
import MyForm from "../../views/generalComponents/MyForm";
import Field from "../../views/generalComponents/Field";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ILoginFormInput {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
    console.log(data);
  };

  return (
    <MyForm
      handleSubmit={handleSubmit(onSubmit)}
      title={"Login"}
      className={"mx-auto align-middle"}
      submitText={"Login"}
      helper={
        <div className={"flex flex-col justify-end"}>
          <p className={"text-lightText/50"}>New to PartyDJ?</p>
          <Link to={"/auth/register"}>
            <p
              className={
                "text-lightText/50 hover:text-lightText hover:underline"
              }
            >
              Register an account instead!
            </p>
          </Link>
        </div>
      }
    >
      <>
        <Field
          label={"Username"}
          name={"username"}
          type={"text"}
          register={register}
          required
          validation={{
            required: { value: true, message: "Should not be empty." },
            minLength: {
              value: 3,
              message: "Should be at least 3 characters long.",
            },
            maxLength: {
              value: 32,
              message: "Should be maximum 32 characters long.",
            },
          }}
          errors={errors}
        />
        <Field
          label={"Password"}
          name={"password"}
          type={"password"}
          register={register}
          required
          validation={{
            required: { value: true, message: "Should not be empty." },
            minLength: {
              value: 6,
              message: "Should be at least 6 characters long.",
            },
          }}
          errors={errors}
        />
      </>
    </MyForm>
  );
};

export default Login;
