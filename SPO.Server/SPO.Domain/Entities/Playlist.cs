using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class Playlist : AuditableEntity<string>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverImage { get; set; }
        public bool IsPublic { get; set; }
        public string? UserId { get; set; }
    }
}
