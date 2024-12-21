import { useEffect } from "react";
import { useAppDispatch } from "#/redux/hooks";
import { useSetSpotifyTokensQuery } from "#/redux/spotify/spotifyApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setSpotifyToken } from "#/redux/spotify/spotifySlice";
import { errorToast, successToast } from "#/components/Toasts";

const SpotifyCallback = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get("code") ?? "";
  const state = urlParams.get("state") ?? "";

  const navigate = useNavigate();

  const {
    // status,
    data,
    isError,
    isLoading,
    isFetching,
    isSuccess,
    isUninitialized,
  } = useSetSpotifyTokensQuery({ code, state });

  // const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSpotifyToken({ token: data.token }));
      successToast("Successfully connected Spotify!");
      // TODO: Redirect works, but the token does not stay because of the navigate(-1) -> goes to "another page" -> redux context is lost
      // TODO: To solve this, implement auto-login when page loads (multiple tabs), then if the user's isSpotifyConnected flag is true, fetch the token also.
      navigate(-1);
    }
    if (isError) {
      errorToast("Failed to connected Spotify!");
    }
  }, [isSuccess, isError, dispatch, data, navigate]);

  return (
    <p>
      {isSuccess && "Successfully connected with Spotify!"}
      {isError && "Failed to connect Spotify!"}
      {isUninitialized || isLoading || (isFetching && "Connecting Spotify...")}
    </p>
  );
};

export default SpotifyCallback;
