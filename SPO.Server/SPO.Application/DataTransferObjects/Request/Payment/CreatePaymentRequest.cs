namespace SPO.Application.DataTransferObjects.Request.Payment
{
    public class CreatePaymentRequest
    {
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
    }
}