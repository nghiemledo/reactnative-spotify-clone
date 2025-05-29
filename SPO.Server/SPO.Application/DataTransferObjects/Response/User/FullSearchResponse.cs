namespace SPO.Application.DataTransferObjects.Response.User
{
    public class ArtistResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? CoverImage { get; set; }
    }

    public class SongResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? ArtistId { get; set; }
        public string? ArtistName { get; set; }
        public string CoverImage { get; set; } = string.Empty;
    }

    public class ShowResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Creator { get; set; } = string.Empty;
        public string? CoverImage { get; set; }
    }

    public class FullSearchResponse
    {
        public List<ArtistResponse> Artists { get; set; } = new List<ArtistResponse>();
        public List<SongResponse> Songs { get; set; } = new List<SongResponse>();
        public List<ShowResponse> Shows { get; set; } = new List<ShowResponse>();
    }
}
