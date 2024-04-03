import React from "react";
import SearchBar from "./components/SearchBar";
import { useForm } from "react-hook-form";
import TrackCard, { EPlatformType } from "./components/TrackCard";

interface IArtistResponse {
  name: string;
}

export interface ITrack {
  title: string;
  coverUri: string;
  artists: string[];
  duration: number;
  platformType: EPlatformType;
}

interface ITrackSearchResult extends ITrack {
  uri: string;
}

export interface ISearchFormInput {
  query: string;
}

// TODO: add feedback for empty search results, popups for successful track addition
const Party = () => {
  const searchResults: ITrackSearchResult[] = [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchFormInput>();

  const onSubmit = (data: ISearchFormInput) => {
    console.log(data);
  };

  return (
    <>
      <p className={"text-center text-xl pb-4"}>Party</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchBar
          name={"query"}
          label={"Search"}
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

      <div className={"flex flex-col"}>
        <p>Results</p>
        <div className={"grid grid-cols-1 gap-2"}>
          <TrackCard
            title={"Hello darkness"}
            artists={["1 3 5 7 9 13 16 19 22 25 28 31 34 37 40 43 4748"]}
            duration={4 * 60 + 20}
            coverUri={"https://placehold.co/100x100"}
            platformType={EPlatformType.SPOTIFY}
          />
          <TrackCard
            title={"1 3 5 7 9 12 15 18 21 24 27 30 33 35"}
            artists={["Darkest Soul", "Darkness"]}
            duration={4 * 60 + 20}
            coverUri={"https://placehold.co/100x100"}
            platformType={EPlatformType.SPOTIFY}
          />
          <TrackCard
            title={"Hello darkness"}
            artists={["Darkest Soul", "Darkness"]}
            duration={4 * 60 + 20}
            coverUri={"https://placehold.co/100x100"}
            platformType={EPlatformType.YOUTUBE}
          />
          <TrackCard
            title={"Hello darkness"}
            artists={["Darkest Soul", "Darkness"]}
            duration={4 * 60 + 20}
            coverUri={"https://placehold.co/100x100"}
            platformType={EPlatformType.YOUTUBE}
          />
        </div>
      </div>
    </>
  );
};

export default Party;
