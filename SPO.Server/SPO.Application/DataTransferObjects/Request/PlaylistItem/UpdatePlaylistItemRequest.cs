namespace SPO.Application.DataTransferObjects.Request.PlaylistItem
{
    public class UpdatePlaylistItemRequest
    {
        public string? Id { get; set; }
        public string? PlaylistId { get; set; }
        public string? SongId { get; set; }
        public string? EpisodeId { get; set; }
    }
}
