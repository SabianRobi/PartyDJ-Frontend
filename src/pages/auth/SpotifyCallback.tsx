import { errorToast, successToast } from "#/components/utils";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useSetSpotifyTokensMutation } from "#/redux/spotify/spotifyApiSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SpotifyCallback = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get("code") ?? "";
  const state = urlParams.get("state") ?? "";
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const [doeSetSpotifyTokens, { isError, isLoading, isSuccess, isUninitialized }] = useSetSpotifyTokensMutation();

  useEffect(() => {
    doeSetSpotifyTokens({ code, state })
      .unwrap()
      .then(() => {
        console.info("Successfully connected Spotify!");
        successToast("Successfully connected Spotify!");
        void navigate(`/user/${user?.username}`);
      })
      .catch((error) => {
        console.info("Failed to connect Spotify: ", error);
        errorToast("Failed to connect Spotify!");
      });
  }, [code, state, doeSetSpotifyTokens, navigate, user?.username]);

  return (
    <p>
      {isSuccess && "Successfully connected with Spotify!"}
      {isError && "Failed to connect Spotify!"}
      {isUninitialized || isLoading || (isLoading && "Connecting Spotify...")}
    </p>
  );
};

export default SpotifyCallback;
