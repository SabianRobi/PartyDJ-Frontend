import { lazy } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = lazy(() => import("#/pages/error/ErrorPage"));

const RootBoundary = () => {
  const error: unknown = useRouteError();

  if (isRouteErrorResponse(error)) {
    return error.status === 404 ? (
      <ErrorPage status={404} message="Page not found" />
    ) : error.status === 401 ? (
      <ErrorPage status={401} message="You don't have permission to visit this page" />
    ) : error.status === 503 ? (
      <ErrorPage status={503} message="Something went wrong with your request" />
    ) : null;
  }

  return (
    <ErrorPage
      status={(error as { status: number }).status}
      message="An unknown error occurred, please refresh the page"
    />
  );
};

export default RootBoundary;
