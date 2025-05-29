namespace SPO.Application.DataTransferObjects.Response.User
{
    public class GetPlaylistByUserIdResponse
    {
        public int? ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? CoverImage { get; set; }
        public bool IsPublic { get; set; }
        public DateTimeOffset? CreatedAt { get; set; }
        public DateTimeOffset? UpdatedAt { get; set; }
    }
}
