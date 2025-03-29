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

        public Task<List<Review>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Review?> GetByIdAsync(int vehicleId, int reviewId)
        {
            var review = await _context.Reviews
                .Where(r => r.VehicleId == vehicleId && r.Id == reviewId)
                .Include(review => review.User.UserName)
                .FirstOrDefaultAsync();

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
                .Include(r => r.User.UserName)
                .ToListAsync();

            return reviews;
        }
    }
}
