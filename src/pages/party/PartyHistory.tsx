import { selectParty, useAppSelector } from "#/redux/hooks";
import { useGetPlayedTracksQuery } from "#/redux/party/partyApiSlice";
import prettyMilliseconds from "pretty-ms";
import TrackCard from "./components/TrackCard";

const PartyHistory = () => {
  const party = useAppSelector(selectParty);

  const {
    data: playedTracks,
    isFetching,
    error
  } = useGetPlayedTracksQuery(party?.name ?? "", {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000
  });

  return (
    <>
      <p className="text-center font-bold text-xl mt-2 mb-8">Party history</p>
      {isFetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occurred, please try again.</p>
      ) : playedTracks?.length === 0 || !playedTracks ? (
        <p>History is empty</p>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {playedTracks.map((track, index) => (
            <TrackCard
              key={"track-" + index}
              title={track.title}
              artists={track.artists.map((artist) => artist.name)}
              duration={track.length}
              coverUri={track.coverUri}
              platformType={track.platformType}
              altText={
                "Ended " +
                prettyMilliseconds(track.endedAt, {
                  secondsDecimalDigits: 0
                }) +
                " ago"
              }
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PartyHistory;
