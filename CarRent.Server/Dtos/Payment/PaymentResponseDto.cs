namespace CarRent.Server.Dtos.Payment
{
    public class PaymentResponseDto
    {
        public int Id { get; set; }
        public string CardHolder { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }
        public string UserId { get; set; }
    }
}
