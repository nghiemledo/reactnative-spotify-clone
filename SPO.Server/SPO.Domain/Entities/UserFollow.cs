using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class UserFollow : NonAuditableEntity<string>
    {   
        public string? UserId { get; set; }
        public string? ArtistId { get; set; }
        public DateTimeOffset FollowedAt { get; set; }
    }
}
