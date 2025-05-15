namespace SPO.Application.DataTransferObjects.Request.UserRoles.User
{
    public class CreateUserRequest
    {
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string Password { get; set; }
    }
}
