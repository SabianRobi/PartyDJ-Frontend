import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useLazyGetPartyByNameQuery } from "#/redux/party/partyApiSlice";
import { useLazyGetTokenQuery } from "#/redux/spotify/spotifyApiSlice";
import { type ReactNode, useEffect } from "react";

type AuthProps = {
  children: ReactNode;
};
const Auth = ({ children }: AuthProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [doGetPartyByName] = useLazyGetPartyByNameQuery();
  const [doGetSpotifyToken] = useLazyGetTokenQuery();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.partyName) {
      void doGetPartyByName({ name: user.partyName, currentUser: user });
    }
  }, [doGetPartyByName, user]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.spotifyConnected) {
      void doGetSpotifyToken();
    }
  }, [doGetSpotifyToken, user]);

  return <>{children}</>;
};

export default Auth;
