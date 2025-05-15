namespace SPO.Application.DataTransferObjects.Request.PodcastCategory
{
    public class CreatePodcastCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
