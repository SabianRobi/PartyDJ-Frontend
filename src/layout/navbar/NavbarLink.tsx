import { NavLink } from "react-router-dom";

type NavbarLinkProps = {
  to: string;
  text: string | JSX.Element;
  onClick?: () => void;
};

const NavbarLink = (props: NavbarLinkProps) => (
  <li className="pl-1 sm:pl-5 my-auto">
    <NavLink
      to={props.to}
      className={({ isActive }) => ["p-2 rounded", isActive ? "bg-secondary font-bold" : "bg-tertiary"].join(" ")}
      onClick={props.onClick}
    >
      {props.text}
    </NavLink>
  </li>
);

export default NavbarLink;
