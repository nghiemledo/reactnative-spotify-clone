import { animations, defaultConfig, shorthands } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const config = createTamagui({
  ...defaultConfig,
  animations,
  shorthands,
  defaultProps: {
    disableClassName: false,
  },
});

type CustomConfig = typeof config;

// ensure types work
declare module "tamagui" {
  interface TamaguiCustomConfig extends CustomConfig {}
}
