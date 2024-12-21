import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import classNames from "classnames";
import Toasts from "#/components/Toasts";
import SpotifyPlayerOverlay from "#/pages/party/components/SpotifyPlayerOverlay";
import { selectPartyRole, useAppSelector } from "#/redux/hooks";

const Layout = () => {
  const navigation = useNavigation();
  let { pathname: currentPath } = useLocation();
  const partyRole = useAppSelector(selectPartyRole);

  return (
    <>
      <Toasts />
      <div
        className={
          "bg-background text-lightText min-h-screen min-w-screen font-k2d relative"
        }
      >
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
                  [
                    "/auth/login",
                    "/auth/register",
                    "/party/join",
                    "/party/create",
                  ].includes(currentPath)
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

        {/* Spotify player */}
        {partyRole === "CREATOR" && <SpotifyPlayerOverlay />}
      </div>
    </>
  );
};

export default Layout;
