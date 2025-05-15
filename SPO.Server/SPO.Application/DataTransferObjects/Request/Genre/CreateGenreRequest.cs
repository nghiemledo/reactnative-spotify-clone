namespace SPO.Application.DataTransferObjects.Request.Genre
{
    public class CreateGenreRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
