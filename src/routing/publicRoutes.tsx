import type { RouteObject } from "react-router-dom";
import { GoogleCallback, Home, Login, Register, SpotifyCallback } from "./pages";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        children: [
          {
            index: true,
            element: <Login />
          },
          {
            path: "spotify",
            children: [
              {
                path: "callback",
                element: <SpotifyCallback />
              }
            ]
          },
          {
            path: "google",
            children: [
              {
                path: "callback",
                element: <GoogleCallback />
              }
            ]
          }
        ]
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
];
