using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface IVehicleRepository
    {
        Task<List<Vehicle>> GetAllAsync();
        Task<Vehicle?> GetByIdAsync(int id);
        Task<List<Vehicle>> GetAvailableVehiclesAsync(VehicleQueryDto query,string userID);
        Task<Vehicle> CreateAsync(Vehicle vehicle);
        Task<Vehicle?> UpdateAsync(int id, UpdateVehicleDto vehicleDto);
        Task<Vehicle?> DeleteAsync(int id);
    }
}
