using Microsoft.Extensions.DependencyInjection;
using SPO.Infrastructure.Dappers.Base;
using SPO.Infrastructure.Repositories;
using SPO.Infrastructure.Repositories.UserRoles;

namespace SPO.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            AddRepository(services);
        }
        public static void AddRepository(this IServiceCollection services)
        {
            services.AddScoped<IDapperBase, DapperBase>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IUserTokenRepository, UserTokenRepository>();
            //services.AddScoped<IFunctionRepository, FunctionRepository>();
            services.AddScoped<IArtistRepository, ArtistRepository>();
            services.AddScoped<IGenreRepository, GenreRepository>();
            services.AddScoped<IAlbumRepository, AlbumRepository>();
            services.AddScoped<ISongRepository, SongRepository>();
            services.AddScoped<IPlaylistRepository, PlaylistRepository>();
            services.AddScoped<IPlaylistItemRepository, PlaylistItemRepository>();
            services.AddScoped<IPodcastCategoryRepository, PodcastCategoryRepository>();
            services.AddScoped<IPodcastShowRepository, PodcastShowRepository>();
            services.AddScoped<IPodcastEpisodeRepository, PodcastEpisodeRepository>();

        }
    }
}
