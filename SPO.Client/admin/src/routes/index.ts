import ManageAlbums from '@/pages/admin/album';
import ManageAddAlbum from '@/pages/admin/album/add';
import AnalyticsOverview from '@/pages/admin/analytics/overview';
import AnalyticsRevenue from '@/pages/admin/analytics/revenue';
import AnalyticsSongs from '@/pages/admin/analytics/songs';
import AnalyticsUsers from '@/pages/admin/analytics/users';
import ManageArtist from '@/pages/admin/artist';
import ManageAddArtist from '@/pages/admin/artist/add';
import ManageGenre from '@/pages/admin/genre';
import AdminPage from '@/pages/admin/index';
import ManagePlaylist from '@/pages/admin/playlist';
import ManageReportsPlaylist from '@/pages/admin/playlist/reports';
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
    { path: `${privatePrefix}/artists/add`, component: ManageAddArtist },

    { path: `${privatePrefix}/albums`, component: ManageAlbums },
    { path: `${privatePrefix}/albums/add`, component: ManageAddAlbum },

    { path: `${privatePrefix}/songs`, component: ManageSong },
    { path: `${privatePrefix}/songs/:slug`, component: ManageViewSong },
    { path: `${privatePrefix}/songs/add`, component: ManageAddSong },
    { path: `${privatePrefix}/songs/:slug/edit`, component: ManageEditSong },

    { path: `${privatePrefix}/genres`, component: ManageGenre },

    { path: `${privatePrefix}/playlists`, component: ManagePlaylist },
    { path: `${privatePrefix}/playlists/reports`, component: ManageReportsPlaylist },

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