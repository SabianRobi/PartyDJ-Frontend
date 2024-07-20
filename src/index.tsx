// React
import React from "react";
import ReactDOM from "react-dom/client";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// Pages
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import GeneralError from "./views/error/GeneralError";
import Layout from "./views/layout/Layout";
import MainPage from "./views/mainPage/MainPage";
import Join from "./views/party/Join";
import Create from "./views/party/Create";
import UserSettings from "./views/user/UserSettings";
import Party from "./views/party/Party";
import PartyHistory from "./views/party/PartyHistory";
import PartyQueue from "./views/party/PartyQueue";
import SpotifyCallback from "./views/auth/SpotifyCallback";

// Redux
import { store } from "./store/store";

// Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./views/auth/Auth";

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
                children: [
                  {
                    index: true,
                    element: <Login />,
                  },
                  {
                    path: "spotify/callback",
                    element: <SpotifyCallback />,
                  },
                ],
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
                element: <UserSettings />,
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
    <Provider store={store}>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </React.StrictMode>
);
