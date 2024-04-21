import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FooterButtons from "./FooterButtons";
import { EditUsernameInput } from "./EditUsernameModalContent";
import { EditEmailInput } from "./EditEmailModalContent";
import { EditPasswordInput } from "./EditPasswordModalContent";
import { DeleteAccountInput } from "./DeleteAccountModalContent";
import {
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
  useUpdateUserPasswordMutation,
} from "../../../store/auth/authApiSlice";
import {
  selectCurrentUser,
  useAppDispatch,
  useAppSelector,
} from "../../../store/hooks";
import {
  IGeneralErrorResponse,
  IUpdateUserDetailsRequest,
  IUpdateUserPasswordRequest,
} from "../../../store/types";
import { clearUser, setUser } from "../../../store/auth/authSlice";
import { errorToast, successToast } from "../../generalComponents/Toasts";
import { useNavigate } from "react-router-dom"; // TODO: make errors more visible

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

interface IUpdateUserDetails {
  currentUsername: string;
  data: IUpdateUserDetailsRequest;
}

interface IUpdateUserPassword {
  currentUsername: string;
  data: IUpdateUserPasswordRequest;
}

// Used by RTK Query
export type UpdateUserDetailsData = {
  currentUsername: string;
  data: EditUsernameInput | EditEmailInput;
};

// Used by RTK Query
export type UpdateUserPasswordData = {
  currentUsername: string;
  data: EditPasswordInput;
};

// Used by RTK Query
export type IDeleteUserData = {
  username: string;
  data: DeleteAccountInput;
};

const ModalContent = (props: ModalContentProps) => {
  const methods = useForm<FormInputTypes>();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [doUpdateUserDetails] = useUpdateUserDetailsMutation();
  const [doUpdateUserPassword] = useUpdateUserPasswordMutation();
  const [doDeleteUser] = useDeleteUserMutation();

  const handleEditPasswordSubmit: SubmitHandler<EditPasswordInput> = (
    data: EditPasswordInput
  ) => {
    // Custom validation
    if (data.password !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        type: "custom",
        message: "Passwords does not match!",
      });
      return;
    }

    const toSubmit: IUpdateUserPassword = {
      currentUsername: user?.username ?? "",
      data: data,
    };

    doUpdateUserPassword(toSubmit)
      .unwrap()
      .then((userData) => {
        dispatch(setUser(userData));
        props.handleCloseModal();
        navigate(`/user/${userData.username}`);

        console.log("Successfully edited password!");
        successToast(`Successfully edited password!`);
      })
      .catch((error: IGeneralErrorResponse) => {
        if (error.data.errors.general) {
          methods.setError("currentPassword", {
            type: "custom",
            message: error.data.errors.general,
          });
        }

        if (error.data.errors["updatePassword.updateUserPasswordRequest"]) {
          methods.setError("confirmPassword", {
            type: "custom",
            message:
              error.data.errors["updatePassword.updateUserPasswordRequest"],
          });
        }

        console.log(`Editing password failed:`, error);
        errorToast(`Failed to edit password!`);
      });
  };

  const handleEditEmailSubmit: SubmitHandler<EditEmailInput> = (
    data: EditEmailInput
  ) => {
    const toSubmit: IUpdateUserDetails = {
      currentUsername: user?.username ?? "",
      data: { email: data.email, username: user?.username ?? "" },
    };
    updateUserDetails("email", toSubmit);
  };

  const handleEditUsernameSubmit: SubmitHandler<EditUsernameInput> = (
    data: EditUsernameInput
  ) => {
    const toSubmit: IUpdateUserDetails = {
      currentUsername: user?.username ?? "",
      data: { email: user?.email ?? "", username: data.username },
    };
    updateUserDetails("username", toSubmit);
  };

  const updateUserDetails = (
    field: "username" | "email",
    toSubmit: IUpdateUserDetails
  ) => {
    doUpdateUserDetails(toSubmit)
      .unwrap()
      .then((userData) => {
        dispatch(setUser(userData));
        props.handleCloseModal();
        navigate(`/user/${userData.username}`);

        console.log("Successfully edited " + field + "!");
        successToast(`Successfully edited ${field}!`);
      })
      .catch((error) => {
        if (error.status === 409) {
          methods.setError(field, {
            type: "custom",
            message: error.data.errors[field],
          });
        }
        console.log(`Editing ${field} failed:`, error);
        errorToast(`Failed to edit ${field}!`);
      });
  };

  const handleDeleteAccountSubmit: SubmitHandler<DeleteAccountInput> = (
    data: DeleteAccountInput
  ) => {
    const toSubmit: IDeleteUserData = {
      username: user?.username ?? "",
      data: data,
    };

    doDeleteUser(toSubmit)
      .unwrap()
      .then(() => {
        dispatch(clearUser());
        props.handleCloseModal();
        navigate("/");

        console.log("Successfully deleted account!");
        successToast(`Successfully deleted account!`);
      })
      .catch((error) => {
        if (error.data.detail === "Validation failure") {
          methods.setError("confirmChoice", {
            type: "custom",
            message: "Should agree.",
          });
        } else if (error.status === 400) {
          methods.setError("password", {
            type: "custom",
            message: "Incorrect password.",
          });
        } else {
          methods.setError("password", {
            type: "custom",
            message: "Something went wrong.",
          });
        }

        console.log(`Failed to delete account:`, error);
        errorToast(`Failed to delete account!`);
      });
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
