import * as React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./navbar/navbar";

export default function Layout() {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" ? (
        <p>Page is loading...</p>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
}
