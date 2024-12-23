import { errorToast, successToast } from "#/components/utils";
import {
  useDeleteUserMutation,
  useUpdateUserDetailsMutation,
  useUpdateUserPasswordMutation
} from "#/redux/auth/authApiSlice";
import { clearUser, setUser } from "#/redux/auth/authSlice";
import { selectCurrentUser, useAppDispatch, useAppSelector } from "#/redux/hooks";
import type { GeneralErrorResponse, UpdateUserDetailsRequest, UpdateUserPasswordRequest } from "#/redux/types";
import { type ReactNode } from "react";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // TODO: make errors more visible
import { type DeleteAccountInput } from "./DeleteAccountModalContent";
import { type EditEmailInput } from "./EditEmailModalContent";
import { type EditPasswordInput } from "./EditPasswordModalContent";
import { type EditUsernameInput } from "./EditUsernameModalContent";
import FooterButtons from "./FooterButtons";
import { FormInputEnum } from "./utils";

// TODO: make errors more visible

type ModalContentProps = {
  handleCloseModal: () => void;
  type: FormInputEnum;
  children: ReactNode;
};

type FormInputTypes = EditUsernameInput | EditEmailInput | EditPasswordInput | DeleteAccountInput;

type UpdateUserDetails = {
  currentUsername: string;
  data: UpdateUserDetailsRequest;
};

type UpdateUserPassword = {
  currentUsername: string;
  data: UpdateUserPasswordRequest;
};

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
export type DeleteUserData = {
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

  const handleEditPasswordSubmit: SubmitHandler<EditPasswordInput> = (data: EditPasswordInput) => {
    // Custom validation
    if (data.password !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        type: "custom",
        message: "Passwords does not match!"
      });
      return;
    }

    const toSubmit: UpdateUserPassword = {
      currentUsername: user?.username ?? "",
      data: data
    };

    console.info("Editing password...");

    doUpdateUserPassword(toSubmit)
      .unwrap()
      .then((userData) => {
        dispatch(setUser(userData));
        props.handleCloseModal();
        void navigate(`/user/${userData.username}`);

        console.info("Successfully edited password!");
        successToast("Successfully edited password!");
      })
      .catch((error: GeneralErrorResponse) => {
        if (error.data.errors.general) {
          methods.setError("currentPassword", {
            type: "custom",
            message: error.data.errors.general
          });
        }

        if (error.data.errors["updatePassword.updateUserPasswordRequest"]) {
          methods.setError("confirmPassword", {
            type: "custom",
            message: error.data.errors["updatePassword.updateUserPasswordRequest"]
          });
        }

        console.info("Editing password failed:", error);
        errorToast("Failed to edit password!");
      });
  };

  const handleEditEmailSubmit: SubmitHandler<EditEmailInput> = (data: EditEmailInput) => {
    const toSubmit: UpdateUserDetails = {
      currentUsername: user?.username ?? "",
      data: { email: data.email, username: user?.username ?? "" }
    };
    updateUserDetails("email", toSubmit);
  };

  const handleEditUsernameSubmit: SubmitHandler<EditUsernameInput> = (data: EditUsernameInput) => {
    const toSubmit: UpdateUserDetails = {
      currentUsername: user?.username ?? "",
      data: { email: user?.email ?? "", username: data.username }
    };
    updateUserDetails("username", toSubmit);
  };

  const updateUserDetails = (field: "username" | "email", toSubmit: UpdateUserDetails) => {
    console.info(`Editing ${field}...`);

    doUpdateUserDetails(toSubmit)
      .unwrap()
      .then((userData) => {
        dispatch(setUser(userData));
        props.handleCloseModal();
        void navigate(`/user/${userData.username}`);

        console.info("Successfully edited " + field + "!");
        successToast(`Successfully edited ${field}!`);
      })
      .catch((error) => {
        if (error.status === 409) {
          methods.setError(field, {
            type: "custom",
            message: error.data.errors[field]
          });
        }
        console.info(`Editing ${field} failed:`, error);
        errorToast(`Failed to edit ${field}!`);
      });
  };

  const handleDeleteAccountSubmit: SubmitHandler<DeleteAccountInput> = (data: DeleteAccountInput) => {
    const toSubmit: DeleteUserData = {
      username: user?.username ?? "",
      data: data
    };

    console.info("Deleting account...");

    doDeleteUser(toSubmit)
      .unwrap()
      .then(() => {
        dispatch(clearUser());
        props.handleCloseModal();
        void navigate("/");

        console.info("Successfully deleted account!");
        successToast("Successfully deleted account!");
      })
      .catch((error) => {
        if (error.data.detail === "Validation failure") {
          methods.setError("confirmChoice", {
            type: "custom",
            message: "Should agree."
          });
        } else if (error.status === 400) {
          methods.setError("password", {
            type: "custom",
            message: "Incorrect password."
          });
        } else {
          methods.setError("password", {
            type: "custom",
            message: "Something went wrong."
          });
        }

        console.info("Failed to delete account:", error);
        errorToast("Failed to delete account!");
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
      <form onSubmit={void methods.handleSubmit(getSubmitHandler)}>
        {props.children}
        <FooterButtons handleCloseModal={props.handleCloseModal} />
      </form>
    </FormProvider>
  );
};

export default ModalContent;
