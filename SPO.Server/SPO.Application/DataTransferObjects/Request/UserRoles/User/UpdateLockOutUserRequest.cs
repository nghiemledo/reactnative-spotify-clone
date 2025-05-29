namespace SPO.Application.DataTransferObjects.Request.UserRoles.User
{
    public class UpdateLockOutUserRequest
    {
        public string? Id { get; set; }
        public bool? LockOutEnabled { get; set; }
    }
}
