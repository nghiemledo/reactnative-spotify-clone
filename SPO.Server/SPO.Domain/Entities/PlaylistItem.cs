using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class PlaylistItem : AuditableEntity<string>
    {
        public string? PlaylistId { get; set; }
        public string? SongId { get; set; }
        public string? EpisodeId { get; set; }
    }
}