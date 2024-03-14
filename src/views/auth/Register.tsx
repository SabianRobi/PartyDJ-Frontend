// @flow
import Field from "@/views/generalComponents/Field";
import MyForm from "@/views/generalComponents/MyForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterFormInput = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormInput>();
  const onSubmit: SubmitHandler<RegisterFormInput> = (data) => {
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
      title={"Register"}
      className={"mx-auto align-middle"}
      submitText={"Register"}
      helper={
        <div className={"flex flex-col justify-end"}>
          <p className={"text-lightText/50"}>Already have an account?</p>
          <Link to={"/auth/login"}>
            <p
              className={
                "text-lightText/50 hover:text-lightText hover:underline"
              }
            >
              Log in instead!
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
          label={"Email"}
          name={"email"}
          type={"email"}
          required
          register={register}
          validation={{
            required: { value: true, message: "Should not be empty." },
            pattern: {
              value:
                "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
              message: "Should be a valid email address.",
            },
            maxLength: {
              value: 320,
              message: "Should be maximum 320 characters long.",
            },
          }}
          errors={errors}
        />
        <Field
          label={"Password"}
          name={"password"}
          type={"password"}
          required
          register={register}
          validation={{
            required: { value: true, message: "Should not be empty." },
            minLength: {
              value: 6,
              message: "Should be at least 6 characters long.",
            },
          }}
          errors={errors}
        />
        <Field
          label={"Confirm password"}
          name={"confirmPassword"}
          type={"password"}
          required
          register={register}
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
}
