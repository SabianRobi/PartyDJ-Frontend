import * as React from "react";
import NavbarLink from "./navbarLink";

export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <NavbarLink text={"Home"} to={"/"} />
        </li>
        <li>
          <NavbarLink text={"User profile"} to={"/user/asd"} />
        </li>
        <li>
          <NavbarLink to={"/auth/login"} text={"Login"} />
        </li>
        <li>
          <NavbarLink to={"/auth/register"} text={"Register"} />
        </li>
      </ul>
      <hr className={"h-10 bg-lime-700"} />
    </>
  );
}
