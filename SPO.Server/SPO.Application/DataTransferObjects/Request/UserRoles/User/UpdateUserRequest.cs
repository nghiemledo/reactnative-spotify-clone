namespace SPO.Application.DataTransferObjects.Request.UserRoles.User
{
    public class UpdateUserRequest
    {
        public string? Id { get; set; }
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
    }
}
