import { createTamagui, getConfig } from "@tamagui/core";

export const config = createTamagui({
  theme: {
    light: {
      background: "#fff",
      text: "#000",
    },
    dark: {
      background: "#000",
      text: "#fff",
    },
  },
  tokens: {
    color: {
      primary: "#007bff",
    },
    space: {
      sm: 8,
      md: 16,
      lg: 24,
    },
  },
});
