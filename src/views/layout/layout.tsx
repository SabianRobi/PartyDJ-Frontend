import * as React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./navbar/navbar";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <>
      <div className={"bg-background text-lightText min-h-screen min-w-screen"}>
        <div className={"flex flex-col max-w-screen-2xl h-max mx-auto"}>
          {navigation.state === "loading" ? (
            <p>Page is loading...</p>
          ) : (
            <div className={"flex flex-col min-h-screen"}>
              <div className={"flex-initial"}>
                <Navbar />
              </div>
              <div className={"flex-1 m-2"}>
                <Outlet />
              </div>
              {/*<div className={"flex-initial"}>Footer</div>*/}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
