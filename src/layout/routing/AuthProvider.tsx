import { useGetMeQuery } from "#/redux/auth/authApiSlice";
import { setUser } from "#/redux/auth/authSlice";
import { selectCurrentUser, useAppDispatch, useAppSelector } from "#/redux/hooks";
import { useLazyGetPartyByNameQuery } from "#/redux/party/partyApiSlice";
import { setParty } from "#/redux/party/partySlice";
import { useLazyGetTokenQuery } from "#/redux/spotify/spotifyApiSlice";
import { setSpotifyToken } from "#/redux/spotify/spotifySlice";
import { type ReactNode, useEffect } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading: isUserLoading, isSuccess, isError, isUninitialized: isUserUninitialized, data } = useGetMeQuery();
  const [doGetPartyByName, { isFetching: isPartyFetching }] = useLazyGetPartyByNameQuery();
  const [doGetSpotifyToken, { isFetching: isSpotifyFetching }] = useLazyGetTokenQuery();

  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  // Fetch user data
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  // Fetch party & Spotify data
  useEffect(() => {
    if (!user) {
      return;
    }

    // Fetch party data
    if (user.partyName) {
      void doGetPartyByName({ name: user.partyName })
        .unwrap()
        .then((data) => {
          dispatch(setParty({ party: data, currentUser: user }));
        });
    }

    // Fetch Spotify token
    if (user.spotifyConnected) {
      void doGetSpotifyToken()
        .unwrap()
        .then((data) => {
          dispatch(setSpotifyToken({ token: data.token }));
        });
    }
  }, [dispatch, doGetPartyByName, doGetSpotifyToken, user]);

  if (isUserUninitialized || isUserLoading || isPartyFetching || isSpotifyFetching) {
    //  TODO: Replace with loading spinner
    return <div>Loading...</div>;
  } else if (user || isSuccess || isError || !isUserUninitialized) {
    return children;
  }

  return <div>Something unexpected happened :(</div>;
};

export default AuthProvider;
