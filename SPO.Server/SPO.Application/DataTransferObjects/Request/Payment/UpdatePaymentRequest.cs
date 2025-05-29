namespace SPO.Application.DataTransferObjects.Request.Payment
{
    public class UpdatePaymentRequest
    {
        public string Id { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
