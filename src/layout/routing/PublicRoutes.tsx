import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const PublicRoutes = () => (
  //  TODO: Replace with loading spinner
  <Suspense fallback={<div>Loading...</div>}>
    <Outlet />
  </Suspense>
);

export default PublicRoutes;
