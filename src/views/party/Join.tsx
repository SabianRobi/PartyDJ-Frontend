import * as React from "react";
import MyForm from "../../views/generalComponents/MyForm";
import Field from "../../views/generalComponents/Field";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export interface IJoinFormInput {
  name: string;
  password: string;
  confirmPassword: string;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinFormInput>();
  const onSubmit: SubmitHandler<IJoinFormInput> = (data) => {
    console.log(data);
  };

  return (
    <MyForm
      handleSubmit={handleSubmit(onSubmit)}
      title={"Join party"}
      className={"mx-auto align-middle"}
      submitText={"Join"}
      helper={
        <div className={"flex flex-col justify-end"}>
          <p className={"text-lightText/50"}>Are you the host?</p>
          <Link to={"/party/create"}>
            <p
              className={
                "text-lightText/50 hover:text-lightText hover:underline"
              }
            >
              Create a party instead!
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
      </>
    </MyForm>
  );
};

export default Join;
