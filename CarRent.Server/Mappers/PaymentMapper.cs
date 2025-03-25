using CarRent.Server.Dtos.Payment;
using CarRent.Server.Models;

namespace CarRent.Server.Mappers
{
    public static class PaymentMapper
    {
        public static Payment ToPaymentModel(this PaymentDto paymentDto)
        {
            return new Payment
            {
                CardNumber = paymentDto.CardNumber,
                CardHolder = paymentDto.CardHolder,
                Expiration = paymentDto.Expiration,
                Cvc = paymentDto.Cvc,
            };
        }
        public static PaymentResponseDto ToPaymentDto(this Payment paymentModel)
        {
            return new PaymentResponseDto
            {
                Id = paymentModel.Id,
                CardHolder = paymentModel.CardHolder,
                Amount = paymentModel.Amount,
                PaidAt = paymentModel.PaidAt,
                UserId = paymentModel.UserId,
            };
        }
    }
}
