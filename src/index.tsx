import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./views/layout/layout";
import Login from "./views/login/login";
import Register from "./views/register/register";
import GeneralError from "./views/error/generalError";
import MainPage from "./views/mainPage/mainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <GeneralError />,
    children: [
      {
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },

          // Authentication & authorization
          {
            path: "auth",
            children: [
              {
                path: "login",
                element: <Login />,
              },
              {
                path: "register",
                element: <Register />,
              },
            ],
          },

          // User
          {
            path: "user",
            children: [
              {
                path: ":username",
                element: <p>User profile page</p>,
              },
            ],
          },

          // Party
          {
            path: "party",
            children: [
              {
                path: "landing",
                element: <>Party main page</>,
              },
              {
                path: "create",
                element: <>Create party</>,
              },
              {
                path: "join",
                element: <>Join party</>,
              },
              {
                path: ":partyName",
                element: <>In party: :partyName</>,
                children: [
                  {
                    path: "queue",
                    element: <>Party queue</>,
                  },
                  {
                    path: "history",
                    element: <>Party queue</>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
