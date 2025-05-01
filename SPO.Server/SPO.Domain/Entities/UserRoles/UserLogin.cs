using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class UserLogin : AuditableEntity<string>
    {
        public string LoginProvider { get; set; } = null!;
        public string ProviderKey { get; set; } = null!;
        public string? ProviderDisplayName { get; set; }
        public string? UserId { get; set; }
    }
}
