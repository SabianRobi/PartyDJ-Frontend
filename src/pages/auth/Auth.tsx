import React, { useEffect } from "react";
import { selectCurrentUser, useAppSelector } from "../../redux/hooks";
import { useLazyGetPartyByNameQuery } from "../../redux/party/partyApiSlice";
import { useLazyGetTokenQuery } from "../../redux/spotify/spotifyApiSlice";

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
