namespace SPO.Application.DataTransferObjects.Request.Genre
{
    public class UpdateGenreRequest
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
