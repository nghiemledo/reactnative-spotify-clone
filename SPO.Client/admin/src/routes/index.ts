import ManageArtistPage from '@/pages/admin/artist';
import ManageArtistCreatePage from '@/pages/admin/artist/create';
import ManageArtistEditPage from '@/pages/admin/artist/edit';
import AdminPage from '@/pages/admin/index';
import ManageSongCreatePage from '@/pages/admin/song/create';
import ManageSongEditPage from '@/pages/admin/song/edit';
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
    { path: `${privatePrefix}/song`, component: ManageSongPage },
    { path: `${privatePrefix}/song/create`, component: ManageSongCreatePage },
    { path: `${privatePrefix}/song/edit`, component: ManageSongEditPage },

    { path: `${privatePrefix}/artists`, component: ManageArtistPage },
    { path: `${privatePrefix}/artists/add`, component: ManageArtistCreatePage },
    { path: `${privatePrefix}/artists/edit`, component: ManageArtistEditPage },
];

const privatePaths = {
    admin: privatePrefix,
    song: `${privatePrefix}/song`,
    artist: `${privatePrefix}/artist`,
}

export { authRoutes, authPaths, privateRoutes, privatePaths }