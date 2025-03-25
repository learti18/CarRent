using CarRent.Server.Data;
using CarRent.Server.Interfaces;
using CarRent.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Server.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _context;
        public PaymentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> GetAllAsync()
        {
            var payments = await _context.Payments
                .Include(p => p.User)
                .ToListAsync();

            return payments;
        }
        public Task<Payment?> GetByIdAsync(int id)
        {
            var payment = _context.Payments
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if(payment == null)
            {
                return null;
            }

            return payment;
        }
        public async Task<List<Payment>?> GetUserPaymentsAsync(string userId)
        {
            var payments = await _context.Payments
                .Include(p => p.User)
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return payments;
        }
        public async Task<Payment> CreateAsync(Payment payment, decimal amount, string userId)
        {
            try
            {
                payment.PaidAt = DateTime.Now;
                payment.Amount = amount;
                payment.UserId = userId;

                await _context.Payments.AddAsync(payment);
                await _context.SaveChangesAsync();

                return payment;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}
