import * as React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-green-400"
                : isPending
                ? "text-blue-400"
                : "text-blue-400"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/user/asd"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-green-400"
                : isPending
                ? "text-blue-400"
                : "text-blue-400"
            }
          >
            User profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/auth/login"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-green-400"
                : isPending
                ? "text-blue-400"
                : "text-blue-400"
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/auth/register"}
            className={({ isActive, isPending }) =>
              isActive
                ? "text-green-400"
                : isPending
                ? "text-blue-400"
                : "text-blue-400"
            }
          >
            Register
          </NavLink>
        </li>
      </ul>
      <hr className={"h-10 bg-lime-700"} />
    </>
  );
}
