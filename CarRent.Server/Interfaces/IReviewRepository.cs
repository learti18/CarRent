using CarRent.Server.Dtos.Reviews;
using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface IReviewRepository
    {
        Task<List<Review>> GetAllAsync();
        Task<Review?> GetByIdAsync(int vehicleId, int reviewId);
        Task<List<Review>> GetVehicleReviewsAsync(int vehicleId);
        Task<Review> GetUserReviewForVehicleAsync(string userId, int vehicleId);
        Task<bool> HasUserReviewedRental(string userId, int rentalId);
        Task<Review> CreateAsync(Review review);
    }
}
