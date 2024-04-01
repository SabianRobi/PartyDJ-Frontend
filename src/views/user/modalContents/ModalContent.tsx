import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FooterButtons from "./FooterButtons";
import { EditUsernameInput } from "./EditUsernameModalContent";
import { EditEmailInput } from "./EditEmailModalContent";
import { EditPasswordInput } from "./EditPasswordModalContent";
import { DeleteAccountInput } from "./DeleteAccountModalContent";

// TODO: make errors more visible

type ModalContentProps = {
  handleCloseModal: () => void;
  type: FormInputEnum;
  children: React.ReactNode;
};

export enum FormInputEnum {
  EditEmailInput,
  EditPasswordInput,
  EditUsernameInput,
  DeleteAccountInput,
}

type FormInputTypes =
  | EditUsernameInput
  | EditEmailInput
  | EditPasswordInput
  | DeleteAccountInput;

const ModalContent = (props: ModalContentProps) => {
  const methods = useForm<FormInputTypes>();

  const handleEditPasswordSubmit: SubmitHandler<EditPasswordInput> = (
    data: EditPasswordInput
  ) => {
    if (data.password !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        type: "custom",
        message: "Passwords does not match!",
      });
      return;
    }

    console.log(data);
    console.log("edited password");
  };

  const handleEditEmailSubmit: SubmitHandler<EditEmailInput> = (
    data: EditEmailInput
  ) => {
    console.log(data);
    console.log("edited email");
  };

  const handleEditUsernameSubmit: SubmitHandler<EditUsernameInput> = (
    data: EditUsernameInput
  ) => {
    console.log(data);
    console.log("edited username");
  };

  const handleDeleteAccountSubmit: SubmitHandler<DeleteAccountInput> = (
    data: DeleteAccountInput
  ) => {
    console.log(data);
    console.log("deleted user");
  };

  const getSubmitHandler = (data: FormInputTypes) => {
    switch (props.type) {
      case FormInputEnum.EditEmailInput:
        return handleEditEmailSubmit(data as EditEmailInput);
      case FormInputEnum.EditPasswordInput:
        return handleEditPasswordSubmit(data as EditPasswordInput);
      case FormInputEnum.EditUsernameInput:
        return handleEditUsernameSubmit(data as EditUsernameInput);
      case FormInputEnum.DeleteAccountInput:
        return handleDeleteAccountSubmit(data as DeleteAccountInput);
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(getSubmitHandler)}>
        {props.children}
        <FooterButtons handleCloseModal={props.handleCloseModal} />
      </form>
    </FormProvider>
  );
};

export default ModalContent;
