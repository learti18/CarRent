using CarRent.Server.Data;
using CarRent.Server.Interfaces;
using CarRent.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Server.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateAsync(Review review)
        {
            await _context.AddAsync(review);
            await _context.SaveChangesAsync();

            return review;
        }

        public async Task<List<Review>> GetAllAsync()
        {
            var reviews = await _context.Reviews
                .Include(r => r.User)
                .ToListAsync();

            return reviews;
        }

        public async Task<Review?> GetByIdAsync(int vehicleId, int reviewId)
        {
            var review = await _context.Reviews
                .Where(r => r.VehicleId == vehicleId && r.Id == reviewId)
                .Include(r => r.User)
                .FirstOrDefaultAsync();

            if (review == null)
            {
                return null;
            }

            return review;
        }

        public async Task<Review> GetUserReviewForVehicleAsync(string userId, int vehicleId)
        {
            var review = await _context.Reviews
                .FirstOrDefaultAsync(r => r.VehicleId == vehicleId && r.UserId == userId);

            if (review == null)
            {
                return null;
            }

            return review;
        }

        public async Task<List<Review>> GetVehicleReviewsAsync(int vehicleId)
        {
            var reviews = await _context.Reviews
                .Where(r => r.VehicleId == vehicleId)
                .Include(r => r.User)
                .ToListAsync();

            return reviews;
        }

        public async Task<bool> HasUserReviewedRental(string userId, int rentalId)
        {
            return await _context.Reviews.AnyAsync(r => r.UserId == userId && r.RentalId == rentalId);
        }
    }
}
