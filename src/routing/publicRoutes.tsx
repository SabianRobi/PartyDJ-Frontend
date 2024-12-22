import type { RouteObject } from "react-router-dom";
import { Home, Login, Register, SpotifyCallback } from "./pages";

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
            path: "spotify/callback",
            element: <SpotifyCallback />
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
