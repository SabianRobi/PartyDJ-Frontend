import React from "react";
import TrackCard from "./components/TrackCard";
import { useGetTracksInQueueQuery } from "../../store/party/partyApiSlice";
import { selectParty, useAppSelector } from "../../store/hooks";
import prettyMilliseconds from "pretty-ms";

const PartyQueue = () => {
  const party = useAppSelector(selectParty);
  let willBePlayedIn = 0;

  const {
    data: tracksInQueue,
    isLoading,
    error,
  } = useGetTracksInQueueQuery(party?.name ?? "", {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  if (isLoading) {
    return <p className="text-center text-xl mt-2"></p>;
  }

  return (
    <>
      <p className="text-center font-bold text-xl mt-2 mb-8">Party queue</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred, please try again.</p>
      ) : tracksInQueue?.length === 0 ? (
        <p>Queue is empty</p>
      ) : (
        <div className={"grid grid-cols-1 gap-3"}>
          {tracksInQueue?.map((track, index, tracks) => {
            if (index > 0) willBePlayedIn += tracks[index - 1].length;
            return (
              <TrackCard
                key={index}
                title={track.title}
                artists={track.artists.map((artist) => artist.name)}
                duration={track.length}
                coverUri={track.coverUri}
                platformType={track.platformType}
                altText={
                  willBePlayedIn === 0
                    ? "Currently playing"
                    : "Will be played in " +
                      prettyMilliseconds(willBePlayedIn, {
                        secondsDecimalDigits: 0,
                      })
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default PartyQueue;
