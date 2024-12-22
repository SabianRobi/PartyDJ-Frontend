import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type ErrorMessage = {
  statusText: string;
  message: string;
};

const GeneralError = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage: ErrorMessage = {
    statusText: "",
    message: ""
  };

  if (isRouteErrorResponse(error)) {
    errorMessage.statusText = error.statusText;
    errorMessage.message = error.data.message;
  }

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage.statusText || errorMessage.message}</i>
      </p>
    </>
  );
};

export default GeneralError;
