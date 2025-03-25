namespace CarRent.Server.Dtos.Payment
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public string CardNumber { get; set; }
        public string CardHolder { get; set; }
        public string Expiration { get; set; }
        public string Cvc { get; set; }
    }
}
