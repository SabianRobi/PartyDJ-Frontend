import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import GeneralError from "./views/error/GeneralError";
import Layout from "./views/layout/Layout";
import MainPage from "./views/mainPage/MainPage";
import Join from "./views/party/Join";
import Create from "./views/party/Create";

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
                element: <Create />,
              },
              {
                path: "join",
                element: <Join />,
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
