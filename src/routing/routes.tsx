import Layout from "#/layout/Layout";
import AuthProvider from "#/layout/routing/AuthProvider";
import PrivateRoutes from "#/layout/routing/PrivateRoutes";
import PublicRoutes from "#/layout/routing/PublicRoutes";
import RootBoundary from "#/pages/error/RootBoundary";
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
        element: <AuthProvider />,
        ErrorBoundary: RootBoundary,
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
    ]
  }
]);
