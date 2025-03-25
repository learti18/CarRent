using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface IPaymentRepository
    {
        Task<List<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(int id);
        Task<List<Payment>?> GetUserPaymentsAsync(string userId);
        Task<Payment> CreateAsync(Payment payment,decimal amount, string userId);
    }
}
