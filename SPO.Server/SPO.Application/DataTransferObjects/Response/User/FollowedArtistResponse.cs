namespace SPO.Application.DataTransferObjects.Response.User
{
    public class FollowedArtistResponse
    {
        public int? ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public DateTime? FollowedAt { get; set; }
    }
}