import React from "react";
import TrackCard from "./components/TrackCard";
import prettyMilliseconds from "pretty-ms";
import { ITrack } from "../../store/party/types";

interface PreviousTrack extends ITrack {
  coverUri: string;
  endedAt: number; //epoch time
}

const PartyHistory = () => {
  // TODO: Some backend API call to get played tracks
  const previousTracks: PreviousTrack[] = [];

  return (
    <>
      <p>Party history</p>
      {previousTracks.map((track) => (
        <TrackCard
          title={track.title}
          artists={track.artists.map((artist) => artist.name)}
          duration={track.duration}
          coverUri={track.coverUri}
          platformType={track.platformType}
          altText={
            "Ended " + prettyMilliseconds(Date.now() - track.endedAt) + " ago"
          }
        />
      ))}
    </>
  );
};

export default PartyHistory;
