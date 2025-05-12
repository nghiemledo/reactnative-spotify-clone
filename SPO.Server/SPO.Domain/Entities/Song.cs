using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities;

public class Song : AuditableEntity<string>
{
    public string Title { get; set; } = string.Empty;
    public string CoverImage { get; set; } = string.Empty;
    public string? GenreId { get; set; }
    public int Duration { get; set; }
    public int Counter { get; set; } = 0;
    public string AudioUrl { get; set; } = string.Empty;
    public string? ArtistId { get; set; }
    public string? AlbumId { get; set; }
}
