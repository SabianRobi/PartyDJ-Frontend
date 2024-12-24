import Field from "#/components/form/Field";
import MyForm from "#/components/form/MyForm";
import { errorToast, successToast } from "#/components/utils";
import { selectCurrentUser, useAppDispatch, useAppSelector } from "#/redux/hooks";
import { useCreatePartyMutation } from "#/redux/party/partyApiSlice";
import { setParty } from "#/redux/party/partySlice";
import type { PartyResponse } from "#/redux/types";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export type CreatePartyFormInput = {
  name: string;
  password: string;
  confirmPassword: string;
};

const Create = () => {
  const [doCreateParty] = useCreatePartyMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<CreatePartyFormInput>();
  const { setError } = methods;

  const onSubmit: SubmitHandler<CreatePartyFormInput> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "custom",
        message: "Passwords does not match!"
      });
      return;
    }

    doCreateParty(data)
      .unwrap()
      .then((data: PartyResponse) => {
        console.info("Successfully created party!");
        successToast("Successfully created party!");

        if (currentUser) {
          dispatch(setParty({ party: data, currentUser }));
        }

        void navigate(`/party/${data.name}`);
      })
      .catch((error) => {
        console.error("Failed to create party: ", error);
        errorToast("Failed to crete party!");

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
    <FormProvider {...methods}>
      <MyForm<CreatePartyFormInput>
        onSubmit={onSubmit}
        title="Create party"
        className="mx-auto align-middle"
        submitText="Create"
        helper={
          <div className="flex flex-col justify-end">
            <p className="text-lightText/50">Did you just arrive?</p>
            <Link to="/party/join">
              <p className="text-lightText/50 hover:text-lightText hover:underline">Join a party instead!</p>
            </Link>
          </div>
        }
      >
        <>
          <Field<CreatePartyFormInput>
            label="Name"
            name="name"
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
          <Field<CreatePartyFormInput> label="Password" name="password" type="password" />

          <Field<CreatePartyFormInput> label="Confirm password" name="confirmPassword" type="password" />
        </>
      </MyForm>
    </FormProvider>
  );
};

export default Create;
