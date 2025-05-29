import ManageAlbums from '@/pages/admin/album';
import ManageAddAlbum from '@/pages/admin/album/add';
import ManageEditAlbum from '@/pages/admin/album/edit';
import ManageViewAlbum from '@/pages/admin/album/view';
import AnalyticsOverview from '@/pages/admin/analytics/overview';
import AnalyticsRevenue from '@/pages/admin/analytics/revenue';
import AnalyticsSongs from '@/pages/admin/analytics/songs';
import AnalyticsUsers from '@/pages/admin/analytics/users';
import ManageArtist from '@/pages/admin/artist';
import ManageAddArtist from '@/pages/admin/artist/add';
import ManageEditArtist from '@/pages/admin/artist/edit';
import ManageViewArtist from '@/pages/admin/artist/view';
import ManageGenre from '@/pages/admin/genre';
import ManageAddGenre from '@/pages/admin/genre/add';
import ManageEditGenre from '@/pages/admin/genre/edit';
import ManageViewGenre from '@/pages/admin/genre/view';
import AdminPage from '@/pages/admin/index';
import ManagePlaylist from '@/pages/admin/playlist';
import ManageAddPlaylist from '@/pages/admin/playlist/add';
import ManageEditPlayist from '@/pages/admin/playlist/edit';
import ManageReportsPlaylist from '@/pages/admin/playlist/reports';
import ManagePodcastCategories from '@/pages/admin/podcast/category';
import ManageAddPodcastCategory from '@/pages/admin/podcast/category/add';
import ManageEditPodcastCategory from '@/pages/admin/podcast/category/edit';
import ManageViewPodcastCategory from '@/pages/admin/podcast/category/view';
import ManagePodcastEpisodes from '@/pages/admin/podcast/episode';
import ManageAddPodcastEpisode from '@/pages/admin/podcast/episode/add';
import ManageEditPodcastEpisode from '@/pages/admin/podcast/episode/edit';
import ManageViewPodcastEpisode from '@/pages/admin/podcast/episode/view';
import ManagePodcastShows from '@/pages/admin/podcast/show';
import ManageAddPodcastShow from '@/pages/admin/podcast/show/add';
import ManageEditPodcastShow from '@/pages/admin/podcast/show/edit';
import ManageViewPodcastShow from '@/pages/admin/podcast/show/view';
import SettingGeneral from '@/pages/admin/setting/general';
import SettingRoles from '@/pages/admin/setting/roles';
import SettingStorage from '@/pages/admin/setting/storage';
import ManageAddSong from '@/pages/admin/song/add';
import ManageEditSong from '@/pages/admin/song/edit';
import ManageSong from '@/pages/admin/song/index';
import ManageViewSong from '@/pages/admin/song/view';
import ManageUser from '@/pages/admin/user';
import ManageAddUser from '@/pages/admin/user/add';
import LoginPage from '@/pages/auth/LoginPage';

const authRoutes = [
    { path: '/login', component: LoginPage },
];
const authPaths = {
    login: '/login',
}

const privatePrefix = '/admin';
const privateRoutes = [
    { path: privatePrefix, component: AdminPage },

    { path: `${privatePrefix}/analytics/overview`, component: AnalyticsOverview },
    { path: `${privatePrefix}/analytics/songs`, component: AnalyticsSongs },
    { path: `${privatePrefix}/analytics/users`, component: AnalyticsUsers },
    { path: `${privatePrefix}/analytics/revenue`, component: AnalyticsRevenue },

    { path: `${privatePrefix}/artists`, component: ManageArtist },
    { path: `${privatePrefix}/artists/:id`, component: ManageViewArtist },
    { path: `${privatePrefix}/artists/add`, component: ManageAddArtist },
    { path: `${privatePrefix}/artists/:id/edit`, component: ManageEditArtist },

    { path: `${privatePrefix}/albums`, component: ManageAlbums },
    { path: `${privatePrefix}/albums/:id`, component: ManageViewAlbum },
    { path: `${privatePrefix}/albums/add`, component: ManageAddAlbum },
    { path: `${privatePrefix}/albums/:id/edit`, component: ManageEditAlbum },

    { path: `${privatePrefix}/songs`, component: ManageSong },
    { path: `${privatePrefix}/songs/:id`, component: ManageViewSong },
    { path: `${privatePrefix}/songs/add`, component: ManageAddSong },
    { path: `${privatePrefix}/songs/:id/edit`, component: ManageEditSong },

    { path: `${privatePrefix}/genres`, component: ManageGenre },
    { path: `${privatePrefix}/genres/:id`, component: ManageViewGenre },
    { path: `${privatePrefix}/genres/add`, component: ManageAddGenre },
    { path: `${privatePrefix}/genres/:id/edit`, component: ManageEditGenre },

    { path: `${privatePrefix}/playlists`, component: ManagePlaylist },
    { path: `${privatePrefix}/playlists/add`, component: ManageAddPlaylist },
    { path: `${privatePrefix}/playlists/:id/edit`, component: ManageEditPlayist },
    { path: `${privatePrefix}/playlists/reports`, component: ManageReportsPlaylist },

    { path: `${privatePrefix}/podcast-categories`, component: ManagePodcastCategories },
    { path: `${privatePrefix}/podcast-categories/:id`, component: ManageViewPodcastCategory },
    { path: `${privatePrefix}/podcast-categories/add`, component: ManageAddPodcastCategory },
    { path: `${privatePrefix}/podcast-categories/:id/edit`, component: ManageEditPodcastCategory },

    { path: `${privatePrefix}/podcast-episodes`, component: ManagePodcastEpisodes },
    { path: `${privatePrefix}/podcast-episodes/:id`, component: ManageViewPodcastEpisode },
    { path: `${privatePrefix}/podcast-episodes/add`, component: ManageAddPodcastEpisode },
    { path: `${privatePrefix}/podcast-episodes/:id/edit`, component: ManageEditPodcastEpisode },

    { path: `${privatePrefix}/podcast-shows`, component: ManagePodcastShows },
    { path: `${privatePrefix}/podcast-shows/:id`, component: ManageViewPodcastShow },
    { path: `${privatePrefix}/podcast-shows/add`, component: ManageAddPodcastShow },
    { path: `${privatePrefix}/podcast-shows/:id/edit`, component: ManageEditPodcastShow },

    { path: `${privatePrefix}/users`, component: ManageUser },
    { path: `${privatePrefix}/users/add`, component: ManageAddUser },

    { path: `${privatePrefix}/settings/general`, component: SettingGeneral },
    { path: `${privatePrefix}/settings/storage`, component: SettingStorage },
    { path: `${privatePrefix}/settings/roles`, component: SettingRoles },
];

const privatePaths = {
    admin: privatePrefix,
    song: `${privatePrefix}/song`,
    artist: `${privatePrefix}/artist`,
}

export { authRoutes, authPaths, privateRoutes, privatePaths }