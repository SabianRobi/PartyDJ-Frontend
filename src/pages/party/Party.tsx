import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TrackCard, { EPlatformType } from "./components/TrackCard";
import { ITrackSearchResultResponse } from "#/redux/party/types";
import {
  useAddTrackToQueueMutation,
  useLazySearchTracksQuery,
} from "#/redux/party/partyApiSlice";
import { selectParty, useAppSelector } from "#/redux/hooks";
import { errorToast, successToast } from "#/components/Toasts";
import Modal from "#/components/modal/Modal";
import SearchSettingsModalContent from "./modalContents/SearchSettingsModalContent";

export interface ISearchFormInput {
  query: string;
  settings: {
    spotify: {
      enabled: boolean;
      limit: number;
    };
    youTube: {
      enabled: boolean;
      limit: number;
    };
  };
}

const Party = () => {
  const [searchResults, setSearchResults] = useState<
    ITrackSearchResultResponse[]
  >([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [doSearchTracks, { isLoading, isFetching }] =
    useLazySearchTracksQuery();
  const [doAddTrackToQueue] = useAddTrackToQueueMutation();
  const party = useAppSelector(selectParty);

  const methods = useForm<ISearchFormInput>({ defaultValues: { query: "" } });

  const onSubmit: SubmitHandler<ISearchFormInput> = (data) => {
    console.log(data);

    let platforms = [];
    if (data.settings.spotify.enabled) {
      platforms.push(EPlatformType.SPOTIFY);
    }
    if (data.settings.youTube.enabled) {
      platforms.push(EPlatformType.YOUTUBE);
    }

    doSearchTracks({
      query: data.query,
      partyName: party!.name,
      platforms: platforms,
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
      <p className="text-center font-bold text-xl mt-2 mb-8">Party</p>

      <FormProvider {...methods}>
        {/* Searchbar */}
        <form onSubmit={methods.handleSubmit(onSubmit)} className={"mt-2"}>
          <SearchBar setIsSettingsModalOpen={setIsSettingsModalOpen} />

          {/* Settings modal */}
          <Modal
            title="Search settings"
            showModal={isSettingsModalOpen}
            setShowModal={setIsSettingsModalOpen}
          >
            <SearchSettingsModalContent />
          </Modal>
        </form>
      </FormProvider>

      {/* Search results */}
      <div className={"flex flex-col mt-8"}>
        {searchResults.length === 0 ? (
          isLoading && !isFetching ? (
            <p>No tracks found :( </p>
          ) : null
        ) : (
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
