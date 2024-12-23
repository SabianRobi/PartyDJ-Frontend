import { selectCurrentUser, useAppDispatch, useAppSelector } from "#/redux/hooks";
import { useLazyGetPartyByNameQuery } from "#/redux/party/partyApiSlice";
import { setParty } from "#/redux/party/partySlice";
import { useLazyGetTokenQuery } from "#/redux/spotify/spotifyApiSlice";
import { setSpotifyToken } from "#/redux/spotify/spotifySlice";
import { type ReactNode, useEffect } from "react";

type AuthProps = {
  children: ReactNode;
};
const Auth = ({ children }: AuthProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [doGetPartyByName] = useLazyGetPartyByNameQuery();
  const [doGetSpotifyToken] = useLazyGetTokenQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.partyName) {
      void doGetPartyByName({ name: user.partyName })
        .unwrap()
        .then((data) => {
          dispatch(setParty({ party: data, currentUser: user }));
        });
    }
  }, [dispatch, doGetPartyByName, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.spotifyConnected) {
      void doGetSpotifyToken()
        .unwrap()
        .then((data) => {
          dispatch(setSpotifyToken({ token: data.token }));
        });
    }
  }, [dispatch, doGetSpotifyToken, user]);

  return <>{children}</>;
};

export default Auth;
