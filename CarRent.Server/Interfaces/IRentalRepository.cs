using CarRent.Server.Dtos.Rental;
using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface IRentalRepository
    {
        Task<List<Rental>> GetAllAsync();
        Task<Rental?> GetByIdAsync(int id);
        Task<List<Rental>> GetUserRentalsAsync(string userId);
        //Task<Rental?> GetUserRentalAsync(string userId, int vehicleId);
        Task<Rental> CreateAsync(Rental rental);
        Task<Rental?> CancelRentalAsync(Rental rental);
        Task UpdateRentalStatusesAsync();
        Task<bool> IsVehicleAvailable(int vehicleId, DateOnly pickupDate, DateOnly dropOffDate);
    }
}
