import React from "react";
import { NavLink } from "react-router-dom";

type NavbarLinkProps = {
  to: string;
  text: string;
};

function NavbarLink(props: NavbarLinkProps) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive, isPending }) =>
        isActive
          ? "text-green-400"
          : isPending
          ? "text-blue-400"
          : "text-blue-400"
      }
    >
      {props.text}
    </NavLink>
  );
}

export default NavbarLink;
