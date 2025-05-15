import {
    Music,
    Users,
    Disc3,
    Mic2,
    ListMusic,
    Settings,
    BarChart4,
    Component,
    Mic,
} from "lucide-react";

export const SidebarData = {
    navMain: [
        {
            title: "Analytics",
            url: "/admin/analytics/overview",
            icon: BarChart4,
            items: [
                { title: "Overview", url: "/admin/analytics/overview" },
                { title: "Song Plays", url: "/admin/analytics/songs" },
                { title: "User Growth", url: "/admin/analytics/users" },
                { title: "Revenue", url: "/admin/analytics/revenue" },
            ],
        },
        {
            title: "Artist Management",
            url: "/admin/artists",
            icon: Mic2,
            isActive: true,
            items: [
                { title: "All Artists", url: "/admin/artists" },
                { title: "Add Artist", url: "/admin/artists/add" },
            ],
        },
        {
            title: "Album Management",
            url: "/admin/albums",
            icon: Disc3,
            items: [
                { title: "All Albums", url: "/admin/albums" },
                { title: "Add Album", url: "/admin/albums/add" },
            ],
        },
        {
            title: "Song Management",
            url: "/admin/songs",
            icon: Music,
            items: [
                { title: "All Songs", url: "/admin/songs" },
                { title: "Add Song", url: "/admin/songs/add" },
            ],
        },
        {
            title: "Genre Management",
            url: "/admin/genres",
            icon: Component,
            items: [
                { title: "All Genres", url: "/admin/genres" },
                { title: "Add Genre", url: "/admin/genres/add" },
            ],
        },
        {
            title: "Playlist Management",
            url: "/admin/playlists",
            icon: ListMusic,
            items: [
                { title: "All Playlists", url: "/admin/playlists" },
                { title: "Reported Playlists", url: "/admin/playlists/reports" },
            ],
        },
        {
            title: "Podcast Management",
            url: "/admin/podcasts",
            icon: Mic,
            items: [
                { title: "Category", url: "/admin/podcast-categories" },
                { title: "Show", url: "/admin/podcast-shows" },
                { title: "Episode", url: "/admin/podcast-episodes" },
            ],
        },
        {
            title: "User Management",
            url: "/admin/users",
            icon: Users,
            items: [
                { title: "All Users", url: "/admin/users" },
                { title: "Add User", url: "/admin/users/add" },
            ],
        },
        {
            title: "Settings",
            url: "/admin/settings/general",
            icon: Settings,
            items: [
                { title: "General Settings", url: "/admin/settings/general" },
                { title: "Audio Storage", url: "/admin/settings/storage" },
                { title: "Roles & Permissions", url: "/admin/settings/roles" },
            ],
        },
    ],
};
