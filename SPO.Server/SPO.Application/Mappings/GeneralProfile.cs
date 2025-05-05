using AutoMapper;
using SPO.Application.DataTransferObjects.Request.Album;
using SPO.Application.DataTransferObjects.Request.Artist;
using SPO.Application.DataTransferObjects.Request.Genre;
using SPO.Application.DataTransferObjects.Request.Playlist;
using SPO.Application.DataTransferObjects.Request.PodcastCategory;
using SPO.Application.DataTransferObjects.Request.PodcastEpisode;
using SPO.Application.DataTransferObjects.Request.PodcastShow;
using SPO.Application.DataTransferObjects.Request.Song;
using SPO.Application.DataTransferObjects.Request.UserRoles.Role;
using SPO.Application.DataTransferObjects.Request.UserRoles.User;
using SPO.Application.DataTransferObjects.Request.UserRoles.UserRole;
using SPO.Domain.Entities;
using SPO.Domain.Entities.UserRoles;

namespace SPO.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<CreateRoleRequest, Role>();
            CreateMap<CreateUserRequest, User>();
            CreateMap<CreateUserRoleRequest, UserRole>();
            CreateMap<CreateUserRoleRequest, UserToken>();
            CreateMap<CreateGenreRequest, Genre>();
            CreateMap<CreateArtistRequest, Artist>();
            CreateMap<CreateSongRequest, Song>();
            CreateMap<CreateAlbumRequest, Album>();
            CreateMap<CreatePlaylistRequest, Playlist>();
            CreateMap<CreatePodcastCategoryRequest, PodcastCategory>();
            CreateMap<CreatePodcastShowRequest, PodcastShow>();
            CreateMap<CreatePodcastEpisodeRequest, PodcastEpisode>();

        }
    }
}
