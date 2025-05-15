using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class UserLikePodcastEpisode : NonAuditableEntity<string>
    {
        public string? UserId { get; set; }
        public string? EpisodeId { get; set; }
        public DateTimeOffset LikedAt { get; set; }
    }
}
