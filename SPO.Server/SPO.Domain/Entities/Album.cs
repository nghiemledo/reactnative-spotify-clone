using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class Album : AuditableEntity<string>
    {
        public string Title { get; set; } = string.Empty;
        public DateTime? ReleaseDate { get; set; }
        public string? CoverImage { get; set; }
        public string? GenreId { get; set; }
        public string? ArtistId { get; set; }
    }
}
