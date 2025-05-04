using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class Artist : AuditableEntity<string>
    {
        public string Name { get; set; } = string.Empty;
        public string? Bio { get; set; }
        public string? UrlAvatar { get; set; }
    }
}