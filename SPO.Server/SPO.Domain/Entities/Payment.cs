using SPO.Domain.Entities.Base;

namespace SPO.Domain.Entities
{
    public class Payment : AuditableEntity<string>
    {
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTimeOffset PaymentDate { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}