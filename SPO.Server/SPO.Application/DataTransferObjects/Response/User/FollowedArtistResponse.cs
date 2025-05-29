namespace SPO.Application.DataTransferObjects.Response.User
{
    public class FollowedArtistResponse
    {
        public int? ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Id { get; set; }
        public string? Name { get; set; }
        public DateTimeOffset? FollowedAt { get; set; }
    }
}