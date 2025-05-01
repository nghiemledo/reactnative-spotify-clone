namespace SPO.Application.DataTransferObjects.Request.UserRoles.UserRole
{
    public class CreateUserRoleRequest
    {
        public required string Id { get; set; }
        public string UserId { get; set; } = null!;
        public string RoleId { get; set; } = null!;
        public bool? IsActive { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}
