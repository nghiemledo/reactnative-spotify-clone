namespace SPO.Application.DataTransferObjects.Request.PlaylistItem
{
    public class CreatePlaylistItemRequest
    {
        public string? PlaylistId { get; set; }
        public string? SongId { get; set; }
        public string? EpisodeId { get; set; }
    }
}
