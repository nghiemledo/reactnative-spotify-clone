import AnalyticsOverview from '@/pages/admin/analytics/overview';
import AnalyticsRevenue from '@/pages/admin/analytics/revenue';
import AnalyticsSongs from '@/pages/admin/analytics/songs';
import AnalyticsUsers from '@/pages/admin/analytics/users';
import ManageArtistPage from '@/pages/admin/artist';
import ManageArtistAddPage from '@/pages/admin/artist/add';
import AdminPage from '@/pages/admin/index';
import ManageSongAddPage from '@/pages/admin/song/add';
import ManageSongPage from '@/pages/admin/song/index';
import LoginPage from '@/pages/auth/LoginPage';
// import RegisterPage from '@/pages/auth/RegisterPage';

const authRoutes = [
    { path: '/login', component: LoginPage },
    // { path: '/register', component: RegisterPage }
];
const authPaths = {
    login: '/login',
    register: '/register'
}

const privatePrefix = '/admin';
const privateRoutes = [
    { path: privatePrefix, component: AdminPage },

    { path: `${privatePrefix}/analytics/overview`, component: AnalyticsOverview },
    { path: `${privatePrefix}/analytics/songs`, component: AnalyticsSongs },
    { path: `${privatePrefix}/analytics/users`, component: AnalyticsUsers },
    { path: `${privatePrefix}/analytics/revenue`, component: AnalyticsRevenue },

    { path: `${privatePrefix}/artists`, component: ManageArtistPage },
    { path: `${privatePrefix}/artists/add`, component: ManageArtistAddPage },

    { path: `${privatePrefix}/songs`, component: ManageSongPage },
    { path: `${privatePrefix}/songs/add`, component: ManageSongAddPage },
];

const privatePaths = {
    admin: privatePrefix,
    song: `${privatePrefix}/song`,
    artist: `${privatePrefix}/artist`,
}

export { authRoutes, authPaths, privateRoutes, privatePaths }