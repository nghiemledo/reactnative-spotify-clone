namespace SPO.Application.DataTransferObjects.Request.PodcastEpisode
{
    public class UpdatePodcastEpisodeRequest
    {
        public string? Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Duration { get; set; }
        public string AudioUrl { get; set; } = string.Empty;
        public DateTime? ReleaseDate { get; set; }
        public string? ShowId { get; set; }
    }
}
