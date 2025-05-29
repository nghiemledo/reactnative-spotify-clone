namespace SPO.Application.DataTransferObjects.Request.UserRoles.User
{
    public class UpdateUserRequest
    {
        public string Id { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? DateofBirth { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? UrlAvatar { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
