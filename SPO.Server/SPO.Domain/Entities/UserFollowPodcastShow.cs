using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class UserFollowPodcastShow : NonAuditableEntity<string>
    {
        public string? UserId { get; set; }
        public string? ShowId { get; set; }
        public DateTimeOffset FollowedAt { get; set; }
    }
}
