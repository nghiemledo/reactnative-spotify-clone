using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class PodcastEpisode : AuditableEntity<string>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Duration { get; set; }
        public string AudioUrl { get; set; } = string.Empty;
        public DateTime? ReleaseDate { get; set; }
        public string? ShowId { get; set; }
    }
}
