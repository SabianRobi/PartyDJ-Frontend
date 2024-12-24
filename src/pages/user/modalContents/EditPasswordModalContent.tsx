import Field from "#/components/form/Field";

export type EditPasswordInput = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const EditPasswordModalContent = () => (
  <>
    <Field<EditPasswordInput>
      inputClassNames="!bg-primary text-lightText"
      label="Current password"
      name="currentPassword"
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
    <Field<EditPasswordInput>
      inputClassNames="!bg-primary text-lightText"
      label="New password"
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
    <Field<EditPasswordInput>
      inputClassNames="!bg-primary text-lightText"
      label="Confirm new password"
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
);

export default EditPasswordModalContent;
