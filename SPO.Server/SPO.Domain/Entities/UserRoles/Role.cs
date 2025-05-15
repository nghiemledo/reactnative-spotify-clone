using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class Role : NonAuditableEntity<string>
    {
        public string? Name { get; set; }
        public DateTimeOffset? ConcurrencyStamp { get; set; }
    }
}
