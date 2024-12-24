import Field from "#/components/form/Field";
import MyForm from "#/components/form/MyForm";
import { errorToast, successToast } from "#/components/utils";
import { selectCurrentUser, useAppDispatch, useAppSelector } from "#/redux/hooks";
import { useJoinPartyMutation } from "#/redux/party/partyApiSlice";
import { setParty } from "#/redux/party/partySlice";
import type { PartyResponse } from "#/redux/types";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export type JoinPartyFormInput = {
  name: string;
  password: string;
  confirmPassword: string;
};

const Join = () => {
  const methods = useForm<JoinPartyFormInput>();
  const [doJoinParty] = useJoinPartyMutation();
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<JoinPartyFormInput> = (data) => {
    doJoinParty(data)
      .unwrap()
      .then((data: PartyResponse) => {
        console.info("Successfully joined party!");
        successToast("Successfully joined party!");

        if (currentUser) {
          dispatch(setParty({ party: data, currentUser }));
        }

        void navigate(`/party/${data.name}`);
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
    <FormProvider<JoinPartyFormInput> {...methods}>
      <MyForm<JoinPartyFormInput>
        onSubmit={onSubmit}
        title="Join party"
        className="mx-auto align-middle"
        submitText="Join"
        helper={
          <div className="flex flex-col justify-end">
            <p className="text-lightText/50">Are you the host?</p>
            <Link to="/party/create">
              <p className="text-lightText/50 hover:text-lightText hover:underline">Create a party instead!</p>
            </Link>
          </div>
        }
      >
        <>
          <Field<JoinPartyFormInput>
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
          <Field<JoinPartyFormInput> label="Password" name="password" type="password" />
        </>
      </MyForm>
    </FormProvider>
  );
};

export default Join;
