namespace SPO.Application.DataTransferObjects.Request.Artist
{
    public class UpdateArtistRequest
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? UrlAvatar { get; set; }
    }
}
