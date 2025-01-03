import ToggleSwitch from "#/components/form/ToggleSwitch";
import Card from "#/pages/user/card/Card";
import CardRow from "#/pages/user/card/CardRow";
import { selectCurrentUser, useAppSelector } from "#/redux/hooks";
import { useFormContext } from "react-hook-form";
import type { SearchFormInput } from "../Party";

const SearchSettingsModalContent = () => {
  const { register, setValue, getValues, watch } = useFormContext<SearchFormInput>();
  const isSpotifyConnected = useAppSelector(selectCurrentUser)?.spotifyConnected ?? false;
  const isGoogleConnected = useAppSelector(selectCurrentUser)?.googleConnected ?? false;

  return (
    <div className="flex flex-col gap-4">
      <Card title="General">
        <CardRow
          name="Data saver"
          value={
            <ToggleSwitch
              {...register("settings.dataSaver")}
              onChange={() => setValue("settings.dataSaver", !getValues("settings.dataSaver"))}
              checked={getValues("settings.dataSaver")}
              disabled
            />
          }
        />
      </Card>

      <Card title="Spotify" className={isSpotifyConnected ? "" : "opacity-70"}>
        <CardRow
          name="Enable search"
          value={
            <ToggleSwitch
              {...register("settings.spotify.enabled")}
              onChange={() => setValue("settings.spotify.enabled", !getValues("settings.spotify.enabled"))}
              checked={isSpotifyConnected && watch("settings.spotify.enabled")}
              disabled={!isSpotifyConnected}
            />
          }
        />
        <CardRow
          name="Count"
          value={getValues("settings.spotify.limit")}
          // icon={<FontAwesomeIcon icon={faPen} className="text-orange" />}
          // onIconClick={handleOpenEditUsernameModal}
        />
      </Card>

      <Card title="YouTube" className={isGoogleConnected ? "" : "opacity-70"}>
        <CardRow
          name="Enable search"
          value={
            <ToggleSwitch
              {...register("settings.youTube.enabled")}
              onChange={() => setValue("settings.youTube.enabled", !getValues("settings.youTube.enabled"))}
              checked={isGoogleConnected && watch("settings.youTube.enabled")}
              disabled={!isGoogleConnected}
            />
          }
        />
        <CardRow
          name="Count"
          value={getValues("settings.youTube.limit")}
          // icon={<FontAwesomeIcon icon={faPen} className="text-orange" />}
          // onIconClick={handleOpenEditUsernameModal}
        />
      </Card>
    </div>
  );
};

export default SearchSettingsModalContent;
