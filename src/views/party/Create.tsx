import * as React from "react";
import MyForm from "../../views/generalComponents/MyForm";
import Field from "../../views/generalComponents/Field";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ICreateFormInput {
  name: string;
  password: string;
  confirmPassword: string;
}

const Create = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICreateFormInput>();
  const onSubmit: SubmitHandler<ICreateFormInput> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords does not match!",
      });
      return;
    }

    console.log(data);
  };

  return (
    <MyForm
      handleSubmit={handleSubmit(onSubmit)}
      title={"Create party"}
      className={"mx-auto align-middle"}
      submitText={"Create"}
      helper={
        <div className={"flex flex-col justify-end"}>
          <p className={"text-lightText/50"}>Did you just arrive?</p>
          <Link to={"/party/join"}>
            <p
              className={
                "text-lightText/50 hover:text-lightText hover:underline"
              }
            >
              Join a party instead!
            </p>
          </Link>
        </div>
      }
    >
      <>
        <Field
          label={"Name"}
          name={"name"}
          type={"text"}
          required
          register={register}
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
          errors={errors}
        />

        <Field
          label={"Confirm password"}
          name={"confirmPassword"}
          type={"password"}
          register={register}
          errors={errors}
        />
      </>
    </MyForm>
  );
};

export default Create;
