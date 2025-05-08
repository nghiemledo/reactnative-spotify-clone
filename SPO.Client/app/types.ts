export type RootStackParamList = {
  Home: undefined; // Tab Navigator (Home, Search, Library)
  // Album: { id: string }; // Album screen with an 'id' parameter
  // PlayerModal: undefined; // Player modal
  Register: undefined; // Register screen
  EmailRegister: undefined; // Email register screen
  EmailLogin: undefined; // Email login screen
  DetailPlaylist: { id: string }; // Playlist detail screen with an 'id' parameter
  AlbumScreen: { id: string }; // Album screen with an 'id' parameter
  login: undefined; // Login screen
  Main: { screen?: string };
};
