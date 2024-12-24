import { useGetMeQuery } from "#/redux/auth/authApiSlice";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useLazyGetPartyByNameQuery } from "#/redux/party/partyApiSlice";
import { useLazyGetTokenQuery } from "#/redux/spotify/spotifyApiSlice";
import { type ReactNode, useEffect } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading: isUserLoading, isSuccess, isError, isUninitialized: isUserUninitialized } = useGetMeQuery();
  const [doGetPartyByName] = useLazyGetPartyByNameQuery();
  const [doGetSpotifyToken] = useLazyGetTokenQuery();

  const user = useAppSelector(selectCurrentUser);

  // Fetch party & Spotify data
  useEffect(() => {
    if (!user) {
      return;
    }

    // Fetch party data
    if (user.partyName) {
      void doGetPartyByName({ name: user.partyName });
    }

    // Fetch Spotify token
    if (user.spotifyConnected) {
      void doGetSpotifyToken();
    }
  }, [doGetPartyByName, doGetSpotifyToken, user]);

  if (isUserUninitialized || isUserLoading) {
    //  TODO: Replace with loading spinner
    return <div>Loading...</div>;
  } else if (user || isSuccess || isError || !isUserUninitialized) {
    return children;
  }

  return <div>Something unexpected happened :(</div>;
};

export default AuthProvider;
