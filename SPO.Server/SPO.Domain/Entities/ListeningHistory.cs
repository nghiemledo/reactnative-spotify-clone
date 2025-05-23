using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class ListeningHistory : NonAuditableEntity<string>
    {
        public string? UserId { get; set; }
        public string? SongId { get; set; }
        public string? EpisodeId { get; set; }
        public DateTimeOffset ListenedAt { get; set; }
    }
}
