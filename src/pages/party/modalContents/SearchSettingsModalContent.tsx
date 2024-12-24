import ToggleSwitch from "#/components/form/ToggleSwitch";
import Card from "#/pages/user/card/Card";
import CardRow from "#/pages/user/card/CardRow";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useFormContext } from "react-hook-form";

const SearchSettingsModalContent = () => {
  const { register, setValue, getValues, watch } = useFormContext(); // Retrieve all hook methods
  const isSpotifyConnected = useAppSelector(selectCurrentUser)?.spotifyConnected ?? false;

  return (
    <div className="flex flex-col gap-4">
      <Card title="General">
        <CardRow
          name="Data saver"
          value={
            <ToggleSwitch
              {...register("settings.dataSaver")}
              onChange={() => {
                setValue("settings.dataSaver", !getValues("settings.dataSaver"));
              }}
              checked={Boolean(getValues("settings.dataSaver"))}
              disabled
            />
          }
        />
      </Card>
      <Card title="Spotify">
        <CardRow
          name="Enable search"
          value={
            <ToggleSwitch
              {...register("settings.spotify.enabled")}
              onChange={() => {
                setValue("settings.spotify.enabled", !getValues("settings.spotify.enabled"));
              }}
              checked={Boolean(watch("settings.spotify.enabled"))}
              disabled={!isSpotifyConnected}
            />
          }
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
        <CardRow
          name="Count"
          value={isSpotifyConnected ? "10" : "0"}
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
      </Card>
      <Card title="YouTube">
        <CardRow
          name="Enable search"
          value={
            <ToggleSwitch
              {...register("settings.youTube.enabled")}
              onChange={() => {
                setValue("settings.youTube.enabled", !getValues("settings.youTube.enabled"));
              }}
              checked={Boolean(watch("settings.youTube.enabled"))}
            />
          }
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
        <CardRow
          name="Count"
          value={<>10</>}
          // icon={<FontAwesomeIcon icon={faPen} className={"text-orange"} />}
          // onIconClick={handleOpenEditUsernameModal}
        />
      </Card>
    </div>
  );
};

export default SearchSettingsModalContent;
