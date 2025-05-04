namespace SPO.Application.DataTransferObjects.Request.Song
{
    public class UpdateSongRequest
    {
        public string? Id {  get; set; }
        public string Title { get; set; } = string.Empty;
        public string? GenreId { get; set; }
        public int Duration { get; set; }
        public string AudioUrl { get; set; } = string.Empty;
        public string? ArtistId { get; set; }
        public string? AlbumId { get; set; }
    }
}
