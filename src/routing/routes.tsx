import Layout from "#/layout/Layout";
import PrivateRoutes from "#/layout/routing/PrivateRoutes";
import PublicRoutes from "#/layout/routing/PublicRoutes";
import { createBrowserRouter } from "react-router-dom";
import { GeneralError } from "./pages";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <GeneralError />,
    children: [
      {
        element: <PublicRoutes />,
        children: publicRoutes
      },
      {
        element: <PrivateRoutes />,
        children: privateRoutes
      }
    ]
  }
]);
