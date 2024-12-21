import MyForm from "#/components/form/MyForm";
import Field from "#/components/form/Field";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { PartyResponse } from "#/redux/types";
import { errorToast, successToast } from "#/components/Toasts";
import { setParty } from "#/redux/party/partySlice";
import { useJoinPartyMutation } from "#/redux/party/partyApiSlice";
import {
  selectCurrentUser,
  useAppDispatch,
  useAppSelector,
} from "#/redux/hooks";

export interface IJoinPartyFormInput {
  name: string;
  password: string;
  confirmPassword: string;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinPartyFormInput>();
  const [doJoinParty] = useJoinPartyMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IJoinPartyFormInput> = (data) => {
    doJoinParty(data)
      .unwrap()
      .then((data: PartyResponse) => {
        console.log("Successfully joined party!");
        successToast("Successfully joined party!");

        if (currentUser) {
          dispatch(setParty({ party: data, currentUser }));
        }

        navigate(`/party/${data.name}`);
      })
      .catch((error) => {
        console.error("Failed to join party: ", error);
        errorToast("Failed to join party!");

        // TODO: handle error messages
        // if (error.status === 409) {
        //   setError("name", {});
        // } else {
        //   setError("root", {
        //     type: "custom",
        //     message: "Something went wrong, please try again later.",
        //   });
        // }
      });
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
