import CardRow from "#/pages/user/card/CardRow";
import Card from "#/pages/user/card/Card";
import ToggleSwitch from "#/components/form/ToggleSwitch";
import { useFormContext } from "react-hook-form";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";

const SearchSettingsModalContent = () => {
  const { register, setValue, getValues, watch } = useFormContext(); // retrieve all hook methods
  const isSpotifyConnected =
    useAppSelector(selectCurrentUser)?.spotifyConnected ?? false;

  return (
    <>
      <Card title={"General"}>
        <CardRow
          name={"Data saver"}
          value={
            <ToggleSwitch
              {...register("settings.dataSaver")}
              onChange={() => {
                setValue(
                  "settings.dataSaver",
                  !getValues("settings.dataSaver")
                );
              }}
              checked={Boolean(getValues("settings.dataSaver"))}
              disabled
            />
          }
        />
      </Card>
      <Card title={"Spotify"} className="mt-4">
        <CardRow
          name={"Enable search"}
          value={
            <ToggleSwitch
              {...register("settings.spotify.enabled")}
              onChange={() => {
                setValue(
                  "settings.spotify.enabled",
                  !getValues("settings.spotify.enabled")
                );
              }}
              checked={Boolean(watch("settings.spotify.enabled"))}
              disabled={!isSpotifyConnected}
            />
          }
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
        <CardRow
          name={"Count"}
          value={isSpotifyConnected ? "10" : "0"}
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
      </Card>
      <Card title={"YouTube"} className="mt-4">
        <CardRow
          name={"Enable search"}
          value={
            <ToggleSwitch
              {...register("settings.youTube.enabled")}
              onChange={() => {
                setValue(
                  "settings.youTube.enabled",
                  !getValues("settings.youTube.enabled")
                );
              }}
              checked={Boolean(watch("settings.youTube.enabled"))}
            />
          }
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
        <CardRow
          name={"Count"}
          value={<>10</>}
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
      </Card>
    </>
  );
};

export default SearchSettingsModalContent;
