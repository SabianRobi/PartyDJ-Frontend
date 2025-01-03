import Field from "#/components/form/Field";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";

export type EditEmailInput = {
  email: string;
};

const EditEmailModalContent = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Field<EditEmailInput>
      inputClassNames="!bg-primary text-lightText"
      label="New email"
      name="email"
      type="email"
      required
      inputPlaceholder={user?.email}
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
  );
};

export default EditEmailModalContent;
