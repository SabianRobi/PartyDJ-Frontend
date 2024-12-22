import {
  type ToggleSwitchProps as FlowbiteToggleSwitchProps,
  ToggleSwitch as FlowbiteToggleSwitch
} from "flowbite-react";

const ToggleSwitch = (props: FlowbiteToggleSwitchProps) => (
  // <Flowbite theme={{ theme: customTheme }}>
  <FlowbiteToggleSwitch {...props} color="green" />
  // </Flowbite>
);

export default ToggleSwitch;
