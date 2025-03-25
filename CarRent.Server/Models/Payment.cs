namespace CarRent.Server.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public string CardNumber { get; set; } = string.Empty;
        public string CardHolder { get; set; } = string.Empty;
        public string Expiration { get; set; } = string.Empty;
        public string Cvc { get; set; } = string.Empty;

        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
