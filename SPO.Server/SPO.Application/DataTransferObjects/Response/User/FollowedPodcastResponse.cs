namespace SPO.Application.DataTransferObjects.Response.User
{
    public class FollowedPodcastResponse
    {
        public int ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Creator { get; set; }
        public DateTimeOffset? FollowedAt { get; set; }
    }
}