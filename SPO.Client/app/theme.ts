import { Colors, ThemeManager } from "react-native-ui-lib";

Colors.loadColors({
  primary: "#1DB954", // Màu xanh lá của Spotify
  background: "#121212", // Nền đen
  text: "#FFFFFF", // Chữ trắng
});

ThemeManager.setComponentTheme("Card", {
  borderRadius: 10,
  backgroundColor: "#1E1E1E",
});

ThemeManager.setComponentTheme("Button", {
  backgroundColor: Colors.primary,
  borderRadius: 8,
});
