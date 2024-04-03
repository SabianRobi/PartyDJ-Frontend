import React from "react";
import Field from "../../generalComponents/form/Field";
import { useFormContext } from "react-hook-form";

export type EditUsernameInput = {
  username: string;
};

const EditUsernameModalContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const currentUsername = "currentUsername"; // TODO use real data

  return (
    <Field
      inputClassNames={"!bg-primary text-lightText"}
      label={"Username"}
      name={"username"}
      type={"text"}
      register={register}
      required
      inputPlaceholder={currentUsername}
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
