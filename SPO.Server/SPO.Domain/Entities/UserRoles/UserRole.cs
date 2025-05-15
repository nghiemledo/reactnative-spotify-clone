using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class UserRole : AuditableEntity<string>
    {
        public string UserId { get; set; } = null!;
        public string RoleId { get; set; } = null!;
        public bool? IsActive { get; set; }
    }
}
