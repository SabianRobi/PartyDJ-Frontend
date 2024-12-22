import type { RouteObject } from "react-router-dom";
import {
  Create,
  Join,
  Party,
  PartyHistory,
  PartyQueue,
  UserSettings
} from "./pages";

export const privateRoutes: RouteObject[] = [
  {
    path: "user",
    children: [
      {
        path: ":username",
        element: <UserSettings />
      }
    ]
  },
  {
    path: "party",
    children: [
      {
        path: "create",
        element: <Create />
      },
      {
        path: "join",
        element: <Join />
      },
      {
        path: ":partyName",
        children: [
          {
            element: <Party />,
            index: true
          },
          {
            path: "queue",
            element: <PartyQueue />
          },
          {
            path: "history",
            element: <PartyHistory />
          }
        ]
      }
    ]
  }
];
