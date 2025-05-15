using Microsoft.EntityFrameworkCore;
using SPO.Domain.Entities;
using SPO.Domain.Entities.UserRoles;
using SPO.Infrastructure.Extensions;

namespace SPO.Infrastructure.EntityFramework.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleClaim> RoleClaims { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserClaim> UserClaims { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Artist> Artists { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<ListeningHistory> ListeningHistories { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistItem> PlaylistItems { get; set; }
        public DbSet<PodcastCategory> PodcastCategories { get; set; }
        public DbSet<PodcastShow> PodcastShows { get; set; }
        public DbSet<PodcastEpisode> PodcastEpisodes { get; set; }
        public DbSet<UserFollow> UserFollows { get; set; }
        public DbSet<UserFollowPodcastShow> UserFollowPodcastShows { get; set; }
        public DbSet<UserLike> UserLikes { get; set; }
        public DbSet<UserLikePodcastEpisode> UserLikePodcastEpisodes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Seed();
        }
    }
}
