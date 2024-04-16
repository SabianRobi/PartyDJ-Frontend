import * as React from "react";
import MyForm from "../generalComponents/form/MyForm";
import Field from "../generalComponents/form/Field";
import { Link, useNavigate } from "react-router-dom";
import {
  useLazyGetUserByUsernameQuery,
  useLoginMutation,
} from "../../store/auth/authApiSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { errorToast, successToast } from "../generalComponents/Toasts";
import { setUser } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";

export interface LoginData {
  username: string;
  password: string;
}

const Login = () => {
  const [doLogin] = useLoginMutation();
  const [doGetUserByUsername] = useLazyGetUserByUsernameQuery();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginData>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    console.log("Sending login request...");

    doLogin(data)
      .unwrap()
      .then(() => {
        console.log("Successfully logged in!");
        successToast("Successfully logged in!");

        // Fetch user infos & save to store
        doGetUserByUsername(data.username)
          .unwrap()
          .then((user) => {
            dispatch(setUser(user));
          })
          .catch((error) => {
            console.log("Failed to get user by username: ", error);
          });

        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to log in: ", error);
        errorToast("Login failed!");

        setError("password", {
          type: "custom",
          message: "Incorrect username or password.",
        });
      });
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
