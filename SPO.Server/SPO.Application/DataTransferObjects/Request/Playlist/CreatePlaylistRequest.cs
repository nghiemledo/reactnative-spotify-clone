namespace SPO.Application.DataTransferObjects.Request.Playlist
{
    public class CreatePlaylistRequest
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverImage { get; set; }
        public bool IsPublic { get; set; }
        public string? UserId { get; set; }
    }
}
