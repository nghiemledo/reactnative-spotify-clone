namespace SPO.Application.DataTransferObjects.Request.User
{
    public class FullSearchResult
    {
        public string Type { get; set; } = string.Empty;
        public string? Id { get; set; }
        public string? Name { get; set; } // Artist
        public string? Title { get; set; } // Song, Show
        public string? Creator { get; set; } // Show
        public string? ArtistId { get; set; } // Song
        public string? ArtistName { get; set; } // Song
        public string? CoverImage { get; set; } // Song, Show, Artist
        public int ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
