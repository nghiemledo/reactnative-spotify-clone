using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class UserToken : AuditableEntity<string>
    {
        public string? UserId { get; set; }
        public string? LoginProvider { get; set; }
        public string? Name { get; set; }
        public string? Value { get; set; }
        public DateTimeOffset? Expires { get; set; }
    }
}
