import Field from "#/components/form/Field";
import { useFormContext } from "react-hook-form";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";

export type EditUsernameInput = {
  username: string;
};

const EditUsernameModalContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const user = useAppSelector(selectCurrentUser);

  return (
    <Field
      inputClassNames={"!bg-primary text-lightText"}
      label={"New username"}
      name={"username"}
      type={"text"}
      register={register}
      required
      inputPlaceholder={user?.username}
      errors={errors}
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
    />
  );
};

export default EditUsernameModalContent;
