namespace SPO.Application.DataTransferObjects.Request.Album
{
    public class UpdateAlbumRequest
    {
        public string? Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime? ReleaseDate { get; set; }
        public string? CoverImage { get; set; }
        public string? GenreId { get; set; }
        public string? ArtistId { get; set; }
    }
}
