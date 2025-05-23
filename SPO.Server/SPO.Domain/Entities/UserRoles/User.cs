using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities.UserRoles
{
    public class User : AuditableEntity<string>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public DateTime? DateofBirth { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? UrlAvatar { get; set; }
        public string? Email { get; set; }
        public bool? EmailConfirmed { get; set; }
        public string? Passwordhash { get; set; }
        public string? SecurityStamp { get; set; }
        public string? ConcurrencyStamp { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? LockoutEnd { get; set; }
        public bool? LockOutEnabled { get; set; }
        public int? AccessFailedCount { get; set; }
    }
}
