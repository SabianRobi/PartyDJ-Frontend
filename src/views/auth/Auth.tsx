import React, { useEffect } from "react";
import { selectCurrentUser, useAppSelector } from "../../store/hooks";
import { useLazyGetPartyByNameQuery } from "../../store/party/partyApiSlice";
import { useLazyGetTokenQuery } from "../../store/spotify/spotifyApiSlice";

type AuthProps = {
  children: React.ReactNode;
};
const Auth = ({ children }: AuthProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [doGetPartyByName] = useLazyGetPartyByNameQuery();
  const [doGetSpotifyToken] = useLazyGetTokenQuery();

  useEffect(() => {
    if (!user) return;

    if (user.partyName) {
      doGetPartyByName({ name: user.partyName, currentUser: user });
    }
  }, [doGetPartyByName, user]);

  useEffect(() => {
    if (!user) return;

    if (user.spotifyConnected) {
      doGetSpotifyToken();
    }
  }, [doGetSpotifyToken, user]);

  return <>{children}</>;
};

export default Auth;
