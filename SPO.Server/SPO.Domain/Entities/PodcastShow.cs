using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class PodcastShow : AuditableEntity<string>
    {
        public string Title { get; set; } = string.Empty;
        public string Creator { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverImage { get; set; }
        public string? CategoryId { get; set; }
    }
}
