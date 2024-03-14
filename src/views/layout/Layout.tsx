import * as React from "react";
import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "@/views/layout/navbar/Navbar";
import classNames from "classnames";

type CurrentPage =
  | "home"
  | "login"
  | "register"
  | "createParty"
  | "joinParty"
  | "inParty"
  | "partyHistory"
  | "partyQueue"
  | "userSettings";

export default function Layout() {
  const navigation = useNavigation();
  const [currentPage] = useState<CurrentPage>("login");

  return (
    <>
      <div className={"bg-background text-lightText min-h-screen min-w-screen"}>
        <div className={"flex flex-col container mx-auto min-h-full"}>
          {navigation.state === "loading" ? (
            <p>Page is loading...</p>
          ) : (
            <div className={"flex flex-col min-h-screen"}>
              <div className={"flex-initial"}>
                <Navbar />
              </div>
              <div
                className={classNames(
                  "flex-1 m-2",
                  ["login", "register", "createParty", "joinParty"].includes(
                    currentPage
                  )
                    ? "grid place-items-center"
                    : ""
                )}
              >
                <Outlet />
              </div>
              <div className={"flex-initial text-center bg-primary"}>
                Footer will be placed here
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
