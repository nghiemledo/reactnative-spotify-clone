namespace SPO.Application.DataTransferObjects.Response
{
    public class ResponseObject(string message, int status, object? data = null)
    {
        public string Message { get; set; } = message;
        public int Status { get; set; } = status;
        public object? Data { get; set; } = data;
    }
}
