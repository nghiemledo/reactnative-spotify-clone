using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class RoleClaim : AuditableEntity<string>
    {
        public string? RoleId { get; set; }
        public string? ClaimType { get; set; }
        public string? ClaimValue { get; set; }
    }
}
