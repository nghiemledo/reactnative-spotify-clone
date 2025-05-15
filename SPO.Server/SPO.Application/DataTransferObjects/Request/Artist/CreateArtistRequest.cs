namespace SPO.Application.DataTransferObjects.Request.Artist
{
    public class CreateArtistRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? UrlAvatar { get; set; }
    }
}
