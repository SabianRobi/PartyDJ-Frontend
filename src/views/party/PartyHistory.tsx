import React from "react";
import { ITrack } from "./Party";
import TrackCard from "./components/TrackCard";
import prettyMilliseconds from "pretty-ms";

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
          artists={track.artists}
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
