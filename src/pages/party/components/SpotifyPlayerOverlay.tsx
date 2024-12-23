import { selectParty, selectSpotifyTokens, useAppSelector } from "#/redux/hooks";
import { useSetPlaybackDeviceMutation, useSkipTrackMutation } from "#/redux/party/partyApiSlice";
import { useRefreshTokenMutation } from "#/redux/spotify/spotifyApiSlice";
import SpotifyPlayer, { type CallbackState } from "react-spotify-web-playback";

const SpotifyPlayerOverlay = () => {
  const spotifyToken = useAppSelector(selectSpotifyTokens).spotify?.token ?? "";
  const party = useAppSelector(selectParty);
  const [doRefreshSpotifyToken] = useRefreshTokenMutation();
  const [doSetPlaybackDevice] = useSetPlaybackDeviceMutation();
  const [doSkipTrack] = useSkipTrackMutation();

  const handlePlayerChange = (state: CallbackState) => {
    // Set the playback device id at backend (to play tracks in this player)
    if (state.type === "status_update" && state.status === "READY") {
      doSetPlaybackDevice({
        partyName: party?.name ?? "",
        deviceId: state.deviceId
      })
        .unwrap()
        .then(() => {
          console.info("Device id set!");
        })
        .catch((error) => {
          console.error("Failed to set device id!", error);
        });
    }

    // Play next track when the previous has ended
    if (state.type === "player_update" && !state.isPlaying && state.progressMs === 0) {
      console.info("Track ended, requesting to play next...");
      handleSkip();
    }
  };

  const handleSkip = () => {
    doSkipTrack(party?.name ?? "")
      .unwrap()
      .then(() => {
        console.info("Track skipped!");
      })
      .catch((error) => {
        console.error("Failed to skip track!", error);
      });
  };

  return (
    <div className="absolute bottom-0 right-0 w-full">
      <SpotifyPlayer
        token={spotifyToken}
        uris="spotify:track:4lhqb6JvbHId48OUJGwymk" // Avicii: Hey Brother
        getOAuthToken={async (callback) => {
          console.info("Refreshing Spotify token");
          await doRefreshSpotifyToken().unwrap();
          callback(spotifyToken);
        }}
        name="PartyDJ Web Player"
        initialVolume={0.5}
        hideAttribution={true}
        callback={handlePlayerChange}
        styles={{
          bgColor: "#012340", // Primary
          color: "#fff",
          trackNameColor: "#fff",
          sliderColor: "#049DD9", // Tertiary
          sliderHandleColor: "#0367A6", // Secondary
          sliderTrackColor: "#32404b", // Background
          trackArtistColor: "#aaa",
          loaderColor: "#0367A6" // Secondary
        }}
      />
    </div>
  );
};

export default SpotifyPlayerOverlay;
