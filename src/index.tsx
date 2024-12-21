// React
import ReactDOM from "react-dom/client";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

// Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import GeneralError from "./pages/error/GeneralError";
import Layout from "./layout/Layout";
import MainPage from "./pages/MainPage";
import Join from "./pages/party/Join";
import Create from "./pages/party/Create";
import UserSettings from "./pages/user/UserSettings";
import Party from "./pages/party/Party";
import PartyHistory from "./pages/party/PartyHistory";
import PartyQueue from "./pages/party/PartyQueue";
import SpotifyCallback from "./pages/auth/SpotifyCallback";

// Redux
import { store } from "./redux/store";

// Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./pages/auth/Auth";
import { StrictMode } from "react";

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
  <StrictMode>
    <Provider store={store}>
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </StrictMode>
);
