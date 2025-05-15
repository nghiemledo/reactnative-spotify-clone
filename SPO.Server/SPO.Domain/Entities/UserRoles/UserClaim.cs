using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class UserClaim : AuditableEntity<string>
    {
        public string? UserId { get; set; }
        public string? ClaimType { get; set; }
        public string? ClaimValue { get; set; }
    }
}
