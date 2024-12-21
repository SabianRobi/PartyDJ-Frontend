import { useFormContext } from "react-hook-form";
import Field from "#/components/form/Field";

export type EditPasswordInput = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const EditPasswordModalContent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Field
        inputClassNames={"!bg-primary text-lightText"}
        label={"Current password"}
        name={"currentPassword"}
        type={"password"}
        required
        register={register}
        validation={{
          required: { value: true, message: "Should not be empty." },
          minLength: {
            value: 6,
            message: "Should be at least 6 characters long.",
          },
        }}
        errors={errors}
      />
      <Field
        inputClassNames={"!bg-primary text-lightText"}
        label={"New password"}
        name={"password"}
        type={"password"}
        required
        register={register}
        validation={{
          required: { value: true, message: "Should not be empty." },
          minLength: {
            value: 6,
            message: "Should be at least 6 characters long.",
          },
        }}
        errors={errors}
      />
      <Field
        inputClassNames={"!bg-primary text-lightText"}
        label={"Confirm new password"}
        name={"confirmPassword"}
        type={"password"}
        required
        register={register}
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
  );
};

export default EditPasswordModalContent;
