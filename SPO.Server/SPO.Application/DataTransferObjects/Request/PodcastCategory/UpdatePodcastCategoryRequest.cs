namespace SPO.Application.DataTransferObjects.Request.PodcastCategory
{
    public class UpdatePodcastCategoryRequest
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
