using CarRent.Server.Extensions;
using CarRent.Server.Interfaces;
using CarRent.Server.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.Server.Controllers
{
    [Route("api/payments")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepo;
        public PaymentsController(IPaymentRepository paymentRepo)
        {
            _paymentRepo = paymentRepo;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _paymentRepo.GetAllAsync();
            var paymentsDto = payments.Select(payment => payment.ToPaymentDto());

            return Ok(paymentsDto);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPaymentById([FromRoute] int id)
        {
            var payment = await _paymentRepo.GetByIdAsync(id);

            if (payment == null)
            {
                return NotFound("Payment not found!");
            }

            return Ok(payment.ToPaymentDto());
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUserPayments()
        {
            var userId = User.GetUserId();

            var payments = await _paymentRepo.GetUserPaymentsAsync(userId);
            var paymentsDto = payments.Select(payment => payment.ToPaymentDto());

            return Ok(paymentsDto);
        }

 
    }
}
