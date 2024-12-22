import { errorToast } from "#/components/utils";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    errorToast("You don't have permission to visit this page!");
  }

  return !user ? (
    <Navigate to="/" replace />
  ) : (
    //  TODO: Replace with loading spinner
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export default PrivateRoutes;
