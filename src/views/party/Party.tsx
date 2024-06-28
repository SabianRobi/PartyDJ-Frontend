import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import { SubmitHandler, useForm } from "react-hook-form";
import TrackCard, { EPlatformType } from "./components/TrackCard";
import { ITrackSearchResultResponse } from "../../store/party/types";
import {
  useAddTrackToQueueMutation,
  useLazySearchTracksQuery,
} from "../../store/party/partyApiSlice";
import { selectParty, useAppSelector } from "../../store/hooks";
import { errorToast, successToast } from "../generalComponents/Toasts";

export interface ISearchFormInput {
  query: string;
}

// TODO: add feedback for empty search results, popups for successful track addition
const Party = () => {
  const [searchResults, setSearchResults] = useState<
    ITrackSearchResultResponse[]
  >([]);
  const [doSearchTracks] = useLazySearchTracksQuery();
  const [doAddTrackToQueue] = useAddTrackToQueueMutation();
  const party = useAppSelector(selectParty);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchFormInput>({ defaultValues: { query: "" } });

  const onSubmit: SubmitHandler<ISearchFormInput> = (data) => {
    console.log(data);
    doSearchTracks({
      query: data.query,
      partyName: party!.name,
      platforms: [EPlatformType.SPOTIFY],
    })
      .unwrap()
      .then((response) => {
        setSearchResults(response);
      })
      .catch((error) => {
        errorToast("Search failed!");
        console.error("Search failed", error);
      });
  };

  const handleAddTrackToQueue = (searchResult: ITrackSearchResultResponse) => {
    doAddTrackToQueue({
      partyName: party!.name,
      track: { uri: searchResult.uri, platformType: searchResult.platformType },
    })
      .unwrap()
      .then((response) => {
        console.log("Successfully added track to queue!", response);
        successToast("Successfully added track to queue!");
      })
      .catch((error) => {
        errorToast("Failed to add track to queue!");
        console.error("Failed to add track to queue: ", error);
      });
  };

  return (
    <>
      <p className={"text-center text-xl pb-4"}>Party</p>

      <form onSubmit={handleSubmit(onSubmit)} className={"mt-2"}>
        <SearchBar
          label={"Search"}
          name={"query"}
          inputPlaceholder={"Monday left me broken"}
          errors={errors}
          register={register}
          validation={{
            required: { value: true, message: "Should not be empty." },
            minLength: {
              value: 3,
              message: "Should be at least 3 characters long.",
            },
          }}
        />
      </form>

      <div className={"flex flex-col mt-8"}>
        {searchResults.length > 0 && (
          <>
            <p>Results</p>
            <div className={"grid grid-cols-1 gap-3"}>
              {searchResults.map((track) => (
                <TrackCard
                  key={track.uri}
                  title={track.title}
                  artists={track.artists.map((artist) => artist.name)}
                  duration={track.length}
                  coverUri={track.coverUri}
                  platformType={track.platformType}
                  onClick={() => handleAddTrackToQueue(track)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Party;
