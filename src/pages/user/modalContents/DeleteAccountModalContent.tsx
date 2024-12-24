import Checkbox from "#/components/form/Checkbox";
import Field from "#/components/form/Field";

export type DeleteAccountInput = {
  confirmChoice: boolean;
  password: string;
};

const DeleteAccountModalContent = () => (
  <div className="flex flex-col justify-between">
    <div className="pb-24 text-justify">
      By deleting your account, all associated data will be removed from our database and all connected platforms will
      be disconnected automatically.
    </div>
    <Checkbox<DeleteAccountInput>
      name="confirmChoice"
      label="I'm aware of the consequences and I'm aware that this action cannot be undone."
      validation={{
        required: { value: true, message: "Should agree." }
      }}
      required
    />
    <Field<DeleteAccountInput>
      inputClassNames="!bg-primary text-lightText"
      label="Please type in your password to proceed"
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
  </div>
);

export default DeleteAccountModalContent;
