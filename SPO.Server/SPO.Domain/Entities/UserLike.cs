using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class UserLike : NonAuditableEntity<string>
    {
        public string? UserId { get; set; }
        public string? SongId { get; set; }
        public DateTimeOffset LikedAt { get; set; }
    }
}
