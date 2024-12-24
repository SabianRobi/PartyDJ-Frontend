import Field from "#/components/form/Field";
import MyForm from "#/components/form/MyForm";
import { errorToast, successToast } from "#/components/utils";
import { useRegisterMutation } from "#/redux/auth/authApiSlice";
import type { GeneralErrorResponse } from "#/redux/types";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export type RegisterData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [doRegister] = useRegisterMutation();
  const navigate = useNavigate();
  const methods = useForm<RegisterData>();
  const { setError } = methods;

  const onSubmit: SubmitHandler<RegisterData> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords does not match!"
      });
      return;
    }

    console.info("Sending register request... ");

    doRegister(data)
      .unwrap()
      .then(() => {
        console.info("Successfully registered!");
        successToast("Successfully registered!");

        void navigate("/auth/login");
      })
      .catch((error: GeneralErrorResponse) => {
        console.error("Failed to register: ", error);
        errorToast("Register failed!");

        if (error.data.errors) {
          Object.entries(error.data.errors).forEach(([fieldName, errorMessage]) => {
            // @ts-expect-error: fieldName is a string
            setError(fieldName, {
              type: "custom",
              message: errorMessage
            });
          });
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <MyForm<RegisterData>
        onSubmit={onSubmit}
        title="Register"
        className="mx-auto align-middle"
        submitText="Register"
        helper={
          <div className="flex flex-col justify-end">
            <p className="text-lightText/50">Already have an account?</p>
            <Link to="/auth/login">
              <p className="text-lightText/50 hover:text-lightText hover:underline">Log in instead!</p>
            </Link>
          </div>
        }
      >
        <>
          <Field<RegisterData>
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
          <Field<RegisterData>
            label="Email"
            name="email"
            type="email"
            required
            validation={{
              required: { value: true, message: "Should not be empty." },
              pattern: {
                value:
                  "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
                message: "Should be a valid email address."
              },
              maxLength: {
                value: 320,
                message: "Should be maximum 320 characters long."
              }
            }}
          />
          <Field<RegisterData>
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
          <Field<RegisterData>
            label="Confirm password"
            name="confirmPassword"
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
        </>
      </MyForm>
    </FormProvider>
  );
};

export default Register;
