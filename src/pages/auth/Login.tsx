import Field from "#/components/form/Field";
import MyForm from "#/components/form/MyForm";
import { errorToast, successToast } from "#/components/utils";
import { useLoginMutation } from "#/redux/auth/authApiSlice";
import { useEffect } from "react";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export type LoginData = {
  username: string;
  password: string;
};

const Login = () => {
  const [doLogin] = useLoginMutation();
  const navigate = useNavigate();
  const methods = useForm<LoginData>();
  const {
    setError,
    formState: { errors },
    clearErrors,
    watch
  } = methods;

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
    <FormProvider<LoginData> {...methods}>
      <MyForm<LoginData>
        onSubmit={onSubmit}
        title="Login"
        className="mx-auto align-middle"
        submitText="Login"
        helper={
          <div className="flex flex-col justify-end">
            <p className="text-lightText/50">New to PartyDJ?</p>
            <Link to="/auth/register">
              <p className="text-lightText/50 hover:text-lightText hover:underline">Register an account instead!</p>
            </Link>
          </div>
        }
      >
        <>
          <Field<LoginData>
            label="Username"
            name="username"
            type="text"
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
          />
          <Field<LoginData>
            label="Password"
            name="password"
            type="password"
            required
            validation={{
              required: { value: true, message: "Should not be empty." },
              minLength: {
                value: 6,
                message: "Should be at least 6 characters long."
              }
            }}
          />
          {errors.root?.message && <p className="text-error text-sm text-end">{errors.root.message}</p>}
        </>
      </MyForm>
    </FormProvider>
  );
};

export default Login;
