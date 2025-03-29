using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface IFavoriteVehiclesRepository
    {
        Task<FavoriteVehicle?> GetByIdAsync(string userId,int vehicleId);
        Task<List<int>> GetFavoriteVehicleIds(string userId);
        Task<FavoriteVehicle> AddAsync(FavoriteVehicle favoriteVehicle);
        Task<FavoriteVehicle> RemoveAsync(FavoriteVehicle favoriteVehicle);

    }
}
