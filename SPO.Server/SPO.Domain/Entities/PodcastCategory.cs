using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class PodcastCategory : AuditableEntity<string>
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}