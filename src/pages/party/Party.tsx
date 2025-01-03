import Modal from "#/components/modal/Modal";
import { errorToast, successToast } from "#/components/utils";
import { selectParty, useAppSelector } from "#/redux/hooks";
import { useAddTrackToQueueMutation, useLazySearchTracksQuery } from "#/redux/party/partyApiSlice";
import type { TrackSearchResultResponse } from "#/redux/party/types";
import { useState } from "react";
import { type SubmitHandler, FormProvider, useForm } from "react-hook-form";
import SearchBar from "./components/SearchBar";
import TrackCard from "./components/TrackCard";
import { EPlatformType } from "./components/utils";
import SearchSettingsModalContent from "./modalContents/SearchSettingsModalContent";

export type SearchFormInput = {
  query: string;
  settings: {
    dataSaver: boolean;
    spotify: {
      enabled: boolean;
      limit: number;
    };
    youTube: {
      enabled: boolean;
      limit: number;
    };
  };
};

const Party = () => {
  const [searchResults, setSearchResults] = useState<TrackSearchResultResponse[]>([]);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [doSearchTracks, { isLoading, isFetching }] = useLazySearchTracksQuery();
  const [doAddTrackToQueue] = useAddTrackToQueueMutation();
  const party = useAppSelector(selectParty);

  const methods = useForm<SearchFormInput>({
    defaultValues: {
      query: "",
      settings: {
        dataSaver: false,
        spotify: { enabled: true, limit: 5 },
        youTube: { enabled: false, limit: 5 }
      }
    }
  });

  const onSubmit: SubmitHandler<SearchFormInput> = (data) => {
    console.log(data);

    const platforms: EPlatformType[] = [];
    if (data.settings.spotify.enabled) {
      platforms.push(EPlatformType.SPOTIFY);
    }
    if (data.settings.youTube.enabled) {
      platforms.push(EPlatformType.YOUTUBE);
    }

    doSearchTracks({
      query: data.query,
      partyName: party!.name,
      platforms: platforms
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

  const handleAddTrackToQueue = (searchResult: TrackSearchResultResponse) => {
    doAddTrackToQueue({
      partyName: party!.name,
      track: { uri: searchResult.uri, platformType: searchResult.platformType }
    })
      .unwrap()
      .then((response) => {
        console.info("Successfully added track to queue!", response);
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
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-2">
          <SearchBar setIsSettingsModalOpen={setIsSettingsModalOpen} />

          {/* Settings modal */}
          <Modal title="Search settings" showModal={isSettingsModalOpen} setShowModal={setIsSettingsModalOpen}>
            <SearchSettingsModalContent />
          </Modal>
        </form>
      </FormProvider>

      {/* Search results */}
      <div className="flex flex-col mt-8">
        {searchResults.length === 0 ? (
          isLoading && !isFetching ? (
            <p>No tracks found :( </p>
          ) : null
        ) : (
          <>
            <p>Results</p>
            <div className="grid grid-cols-1 gap-3">
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
