import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  CustomFlowbiteTheme,
  Dropdown,
  DropdownDivider,
  Flowbite,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarLink from "./NavbarLink";
import {
  selectCurrentUser,
  selectParticipatingParty,
  selectPartyRole,
  useAppDispatch,
  useAppSelector,
} from "../../../store/hooks";
import { useLogoutMutation } from "../../../store/auth/authApiSlice";
import { errorToast, successToast } from "../../generalComponents/Toasts";
import { clearUser } from "../../../store/auth/authSlice";
import { clearParty } from "../../../store/party/partySlice";
import { clearSpotifyTokens } from "../../../store/spotify/spotifySlice";
import {
  useDeletePartyMutation,
  useLeavePartyMutation,
} from "../../../store/party/partyApiSlice";

enum Status {
  LOGGED_OUT,
  LOGGED_IN,
  IN_PARTY,
}

const customTheme: CustomFlowbiteTheme = {
  dropdown: {
    content: "py-1 focus:outline-none bg-secondary rounded",
    floating: {
      divider: "my-1 h-px bg-tertiary",
      header: "px-4 py-2 text-sm text-lightText",
      item: {
        base: "flex items-center justify-start py-2 px-4 text-sm text-lightText cursor-pointer w-full hover:bg-tertiary focus:outline-none",
      },
      style: {
        auto: "",
      },
    },
  },
};

const Navbar = () => {
  const [status, setStatus] = useState<Status>(Status.LOGGED_OUT);
  const user = useAppSelector(selectCurrentUser);
  const party = useAppSelector(selectParticipatingParty);
  const partyRole = useAppSelector(selectPartyRole);
  const dispatch = useAppDispatch();
  const [doLogout] = useLogoutMutation();
  const [doDeleteParty] = useDeletePartyMutation();
  const [doLeaveParty] = useLeavePartyMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(
      party ? Status.IN_PARTY : user ? Status.LOGGED_IN : Status.LOGGED_OUT
    );
  }, [user, party]);

  const handleLogout = () => {
    console.log("Sending logout request...");
    doLogout(null)
      .unwrap()
      .then(() => {
        console.log("Successfully logged out!");
        successToast("Successfully logged out!");
        dispatch(clearUser());
        dispatch(clearParty());
        dispatch(clearSpotifyTokens());
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to log out: ", error);
        errorToast("Failed to log out!");
      });
  };

  const handleLeaveDeleteParty = async () => {
    if (partyRole === "CREATOR") {
      // TODO: Add a confirm modal when the party has other users in it
      console.log("Deleting party...");

      await doDeleteParty(party!.name)
        .then(() => {
          console.log("Successfully deleted the party!");
          successToast("Successfully deleted the party!");
        })
        .catch((error) => {
          console.error("Failed to delete the party: ", error);
          errorToast("Failed to delete the party!");
        });
    } else {
      console.log("Leaving party...");
      await doLeaveParty(party!.name)
        .then(() => {
          console.log("Successfully left the party!");
          successToast("Successfully left the party!");
        })
        .catch((error) => {
          console.error("Failed to leave the party: ", error);
          errorToast("Failed to leave the party!");
        });
    }

    navigate("/");
  };

  return (
    <>
      <nav
        className={"flex flex-row justify-between p-2 bg-primary items-center"}
      >
        <NavLink to={"/"} className={"flex flex-row content-center"}>
          <img
            src="/logo-light.png"
            className="mr-3 h-10 sm:h-9"
            alt="PartyDJ Logo"
          />
          {/*<span>PartyDJ</span>*/}
        </NavLink>

        <ul className={"flex flex-row justify-around"}>
          {status === Status.LOGGED_OUT ? (
            <>
              <NavbarLink to={"/auth/login"} text={"Login"} />
              <NavbarLink to={"/auth/register"} text={"Register"} />
            </>
          ) : status === Status.LOGGED_IN ? (
            <>
              <NavbarLink to={"/party/join"} text={"Join party"} />
              <NavbarLink to={"/party/create"} text={"Create party"} />
              <li className={"pl-2 sm:pl-5 h-max"}>
                <Flowbite theme={{ theme: customTheme }}>
                  <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                      <FontAwesomeIcon
                        icon={faUser}
                        className={"p-2 rounded-2xl bg-tertiary"}
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="text-sm">{user?.username}</span>
                    </Dropdown.Header>
                    <Dropdown.Item as={NavLink} to={"/user/" + user?.username}>
                      Settings
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={
                        "hover:bg-error hover:text-lightText text-error"
                      }
                      onClick={handleLogout}
                    >
                      <p>Logout</p>
                    </Dropdown.Item>
                  </Dropdown>
                </Flowbite>
              </li>
            </>
          ) : (
            <>
              <li className={"p-2 sm:pl-5 h-max bg-tertiary rounded"}>
                <Flowbite theme={{ theme: customTheme }}>
                  <Dropdown arrowIcon={true} inline={true} label={<p>Party</p>}>
                    <Dropdown.Item as={NavLink} to={"/party/" + party?.name}>
                      <span className="text-sm text-center w-full">
                        {party?.name}
                      </span>
                    </Dropdown.Item>
                    <DropdownDivider />
                    <Dropdown.Item
                      as={NavLink}
                      to={"/party/" + party?.name + "/queue"}
                    >
                      Watch queue
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={NavLink}
                      to={"/party/" + party?.name + "/history"}
                    >
                      Watch history
                    </Dropdown.Item>
                    <DropdownDivider />
                    <Dropdown.Item as={NavLink} to={"/user/" + user?.username}>
                      Manage platforms
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={
                        "hover:bg-error hover:text-lightText text-error"
                      }
                      onClick={handleLeaveDeleteParty}
                    >
                      <p>
                        {partyRole === "CREATOR" ? "Delete" : "Leave"} party
                      </p>
                    </Dropdown.Item>
                  </Dropdown>
                </Flowbite>
              </li>
              <li className={"pl-2 sm:pl-5 h-max my-auto"}>
                <Flowbite theme={{ theme: customTheme }}>
                  <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                      <FontAwesomeIcon
                        icon={faUser}
                        className={"p-2 rounded-2xl bg-tertiary"}
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="text-sm">{user?.username}</span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                      <NavLink to={"/user/" + user?.username}>Settings</NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={
                        "hover:bg-error hover:text-lightText text-error"
                      }
                      onClick={handleLogout}
                    >
                      <p>Logout</p>
                    </Dropdown.Item>
                  </Dropdown>
                </Flowbite>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
