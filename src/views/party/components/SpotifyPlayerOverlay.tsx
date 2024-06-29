import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import {
  selectParty,
  selectSpotifyTokens,
  useAppSelector,
} from "../../../store/hooks";
import { useRefreshTokenMutation } from "../../../store/spotify/spotifyApiSlice";
import {
  useSetPlaybackDeviceMutation,
  useSkipTrackMutation,
} from "../../../store/party/partyApiSlice";

const SpotifyPlayerOverlay = () => {
  const spotifyToken = useAppSelector(selectSpotifyTokens).spotify?.token ?? "";
  const party = useAppSelector(selectParty);
  const [doRefreshSpotifyToken] = useRefreshTokenMutation();
  const [doSetPlaybackDevice] = useSetPlaybackDeviceMutation();
  const [doSkipTrack] = useSkipTrackMutation();

  const handlePlayerChange = (state: SpotifyPlayer.CallbackState) => {
    // Set the playback device id at backend (to play tracks in this player)
    if (state.type === "status_update" && state.status === "READY") {
      doSetPlaybackDevice({
        partyName: party?.name ?? "",
        deviceId: state.deviceId,
      })
        .unwrap()
        .then(() => {
          console.log("Device id set!");
        })
        .catch((error) => {
          console.error("Failed to set device id!", error);
        });
    }

    // Play next track when the previous has ended
    if (
      state.type === "player_update" &&
      !state.isPlaying &&
      state.progressMs === 0
    ) {
      console.log("Track ended, requesting to play next...");
      handleSkip();
    }
  };

  const handleSkip = () => {
    doSkipTrack(party?.name ?? "")
      .unwrap()
      .then(() => {
        console.log("Track skipped!");
      })
      .catch((error) => {
        console.error("Failed to skip track!", error);
      });
  };

  return (
    <div className="absolute bottom-0 right-0 w-full">
      <SpotifyPlayer
        token={spotifyToken}
        uris={"spotify:track:4lhqb6JvbHId48OUJGwymk"} // Avicii: Hey Brother
        getOAuthToken={async (callback) => {
          console.log("Refreshing Spotify token");
          await doRefreshSpotifyToken().unwrap();
          callback(spotifyToken);
        }}
        name={"PartyDJ Web Player"}
        initialVolume={0.5}
        hideAttribution={true}
        callback={handlePlayerChange}
        styles={{
          bgColor: "#012340", // primary
          color: "#fff",
          trackNameColor: "#fff",
          sliderColor: "#049DD9", // tertiary
          sliderHandleColor: "#0367A6", // secondary
          sliderTrackColor: "#32404b", // background
          trackArtistColor: "#aaa",
          loaderColor: "#0367A6", // secondary
        }}
      />
    </div>
  );
};

export default SpotifyPlayerOverlay;
