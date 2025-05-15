namespace SPO.Application.DataTransferObjects.Request.PodcastShow
{
    public class UpdatePodcastShowRequest
    {
        public string? Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Creator { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CoverImage { get; set; }
        public string? CategoryId { get; set; }
    }
}
