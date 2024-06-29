import React from "react";
import TrackCard from "./components/TrackCard";
import { selectParty, useAppSelector } from "../../store/hooks";
import { useGetPlayedTracksQuery } from "../../store/party/partyApiSlice";
import prettyMilliseconds from "pretty-ms";

const PartyHistory = () => {
  const party = useAppSelector(selectParty);

  const {
    data: playedTracks,
    isLoading,
    error,
  } = useGetPlayedTracksQuery(party?.name ?? "", {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  // TODO: sort the tracks by endedAt (either at db level, backed or here)
  return (
    <>
      <p className="text-center font-bold text-xl mt-2 mb-8">Party history</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred, please try again.</p>
      ) : playedTracks?.length === 0 || !playedTracks ? (
        <p>Queue is empty</p>
      ) : (
        <div className={"grid grid-cols-1 gap-3"}>
          {playedTracks.map((track) => {
            return (
              <TrackCard
                title={track.title}
                artists={track.artists.map((artist) => artist.name)}
                duration={track.length}
                coverUri={track.coverUri}
                platformType={track.platformType}
                altText={
                  "Ended " +
                  prettyMilliseconds(Date.now() - Date.parse(track.endedAt), {
                    secondsDecimalDigits: 0,
                  }) +
                  " ago"
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default PartyHistory;
