using CarRent.Server.Data;
using CarRent.Server.Dtos.Rental;
using CarRent.Server.Enums;
using CarRent.Server.Interfaces;
using CarRent.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Server.Repository
{
    public class RentalRepository : IRentalRepository
    {
        private readonly ApplicationDbContext _context;

        public RentalRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Rental>> GetAllAsync()
        {
            var rentals = await _context.Rentals
                    .Include(r => r.Vehicle)
                    .Include(r => r.Payment)
                    .Include(r => r.User)
                    .ToListAsync();

            foreach(var rental in rentals)
            {
                rental.UpdateStatus();
            }

            return rentals;
        }

        public async Task<Rental?> GetByIdAsync(int id)
        {
            var rental = await _context.Rentals
                .Include(r => r.Vehicle)
                .Include(r => r.Payment)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);

            if(rental == null)
            {
                return null;
            }

            return rental;
        }
        public async Task<List<Rental>> GetUserRentalsAsync(string userId)
        {
            var rentals = await _context.Rentals
                .Where(r => r.UserId == userId)
                .Include(r => r.Vehicle)
                .Include(r => r.Payment)
                .Include(r => r.User)
                .ToListAsync();

            foreach (var rental in rentals)
            {
                rental.UpdateStatus();
            }

            return rentals;
        }
        public async Task<Rental> CreateAsync(Rental rental)
        {
            try
            {
                await _context.Rentals.AddAsync(rental);
                await _context.SaveChangesAsync();

                return rental;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Rental?> CancelRentalAsync(Rental rental)
        {
            rental.Status = RentalStatus.Cancelled;
            await _context.SaveChangesAsync();

            return rental;
        }

        public async Task<bool> IsVehicleAvailable(int vehicleId, DateTime pickupDate, DateTime dropOffDate)
        {
            return  !await _context.Rentals
                .AnyAsync(r => r.VehicleId == vehicleId &&
                            r.PickupDateTime < dropOffDate &&
                            r.DropOffDateTime > pickupDate);
        }
    }
}
