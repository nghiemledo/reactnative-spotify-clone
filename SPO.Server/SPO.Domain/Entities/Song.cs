using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities;

public class Song : AuditableEntity<string>
{
    public string? Title { get; set; }
    public string? Slug { get; set; }
    public string? Duration { get; set; }
    public string? ReleaseDate { get; set; }
    public string? Genre { get; set; }
    public string? ArtistId { get; set; }
    public string? AlbumId { get; set; }
}
