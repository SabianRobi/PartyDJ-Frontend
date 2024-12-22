import Field from "#/components/form/Field";
import MyForm from "#/components/form/MyForm";
import { errorToast, successToast } from "#/components/utils";
import { useLoginMutation } from "#/redux/auth/authApiSlice";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export type LoginData = {
  username: string;
  password: string;
};

const Login = () => {
  const [doLogin] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    console.info("Sending login request...");

    doLogin(data)
      .unwrap()
      .then(() => {
        console.info("Successfully logged in!");
        successToast("Successfully logged in!");

        void navigate("/");
      })
      .catch((error) => {
        console.error("Failed to log in: ", error);
        errorToast("Login failed!");

        if (error.status === 401) {
          setError("root", {
            type: "custom",
            message: "Incorrect username or password."
          });
        } else {
          setError("root", {
            type: "custom",
            message: "Something went wrong, please try again later."
          });
        }
      });
  };

  // Remove root error message on any input change
  useEffect(() => {
    const subscription = watch(() => clearErrors());
    return () => subscription.unsubscribe();
  }, [watch, clearErrors]);

  return (
    <MyForm
      handleSubmit={handleSubmit(onSubmit)}
      title="Login"
      className="mx-auto align-middle"
      submitText="Login"
      helper={
        <div className="flex flex-col justify-end">
          <p className="text-lightText/50">New to PartyDJ?</p>
          <Link to="/auth/register">
            <p className="text-lightText/50 hover:text-lightText hover:underline">
              Register an account instead!
            </p>
          </Link>
        </div>
      }
    >
      <>
        <Field
          label="Username"
          name="username"
          type="text"
          register={register}
          required
          validation={{
            required: { value: true, message: "Should not be empty." },
            minLength: {
              value: 3,
              message: "Should be at least 3 characters long."
            },
            maxLength: {
              value: 32,
              message: "Should be maximum 32 characters long."
            }
          }}
          errors={errors}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          register={register}
          required
          validation={{
            required: { value: true, message: "Should not be empty." },
            minLength: {
              value: 6,
              message: "Should be at least 6 characters long."
            }
          }}
          errors={errors}
        />
        {errors.root?.message && (
          <p className="text-error text-sm text-end">{errors.root.message}</p>
        )}
      </>
    </MyForm>
  );
};

export default Login;
