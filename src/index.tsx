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
import Settings from "./views/user/Settings";
import Party from "./views/party/Party";
import PartyHistory from "./views/party/PartyHistory";
import PartyQueue from "./views/party/PartyQueue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <GeneralError />,
    children: [
      {
        errorElement: <GeneralError />,
        children: [
          // Main page
          {
            index: true,
            element: <MainPage />,
          },

          // Authentication & authorization
          {
            path: "auth",
            children: [
              // Login
              {
                path: "login",
                element: <Login />,
              },
              // Register
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
                element: <Settings />,
              },
            ],
          },

          // Party
          {
            path: "party",
            children: [
              // Create
              {
                path: "create",
                element: <Create />,
              },

              // Join
              {
                path: "join",
                element: <Join />,
              },

              // InParty
              {
                path: ":partyName",
                children: [
                  {
                    element: <Party />,
                    index: true,
                  },
                  // Queue
                  {
                    path: "/party/:partyName/queue",
                    element: <PartyQueue />,
                  },
                  // History
                  {
                    path: "/party/:partyName/history",
                    element: <PartyHistory />,
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
