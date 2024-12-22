import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const user = useAppSelector(selectCurrentUser);

  return user ? (
    <Navigate to="/" replace />
  ) : (
    //  TODO: Replace with loading spinner
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export default PublicRoutes;
