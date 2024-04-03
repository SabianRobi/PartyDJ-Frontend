import React from "react";
import { ITrack } from "./Party";
import TrackCard from "./components/TrackCard";
import prettyMilliseconds from "pretty-ms";

interface UserInPartyTrackInQueue {
  username: string;
}

interface ITrackInQueue extends ITrack {
  id: number;
  addedBy: UserInPartyTrackInQueue;
}

const PartyQueue = () => {
  // TODO: Some backend API call to get tracks in queue
  const tracksInQueue: ITrackInQueue[] = [];
  let willBePlayedIn = 0;

  return (
    <>
      <p>Party queue</p>
      {tracksInQueue.map((track, index, tracks) => {
        if (index > 0) willBePlayedIn += tracks[index - 1].duration;
        return (
          <TrackCard
            title={track.title}
            artists={track.artists}
            duration={track.duration}
            coverUri={track.coverUri}
            platformType={track.platformType}
            altText={"Will be played in " + prettyMilliseconds(willBePlayedIn)}
          />
        );
      })}
    </>
  );
};

export default PartyQueue;
