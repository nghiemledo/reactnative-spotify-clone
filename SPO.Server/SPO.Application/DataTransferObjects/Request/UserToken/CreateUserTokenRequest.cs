namespace SPO.Application.DataTransferObjects.Request.UserToken
{
    public class CreateUserTokenRequest
    {
        public string? UserId { get; set; }
        public string? LoginProvider { get; set; }
        public string? Name { get; set; }
        public string? Value { get; set; }
        public DateTime? Expires { get; set; }
    }
}
