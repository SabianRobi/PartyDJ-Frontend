import SpotifyPlayerOverlay from "#/pages/party/components/SpotifyPlayerOverlay";
import { selectPartyRole, useAppSelector } from "#/redux/hooks";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

const Layout = () => {
  const { pathname: currentPath } = useLocation();
  const partyRole = useAppSelector(selectPartyRole);

  return (
    <>
      <ToastContainer />
      <div className="bg-background text-lightText min-h-screen min-w-screen font-k2d relative">
        <div className="flex flex-col max-w-7xl mx-auto min-h-full">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div
              className={`flex-grow m-2 ${
                ["/auth/login", "/auth/register", "/party/join", "/party/create"].includes(currentPath)
                  ? "grid place-items-center"
                  : ""
              }`}
            >
              <Outlet />
            </div>
            <Footer />
          </div>
        </div>

        {/* Spotify player */}
        {partyRole === "CREATOR" && <SpotifyPlayerOverlay />}
      </div>
    </>
  );
};

export default Layout;
