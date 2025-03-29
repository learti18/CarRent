using CarRent.Server.Data;
using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Interfaces;
using CarRent.Server.Mappers;
using CarRent.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CarRent.Server.Repository
{
    public class FavoriteVehiclesRepository : IFavoriteVehiclesRepository
    {
        private readonly ApplicationDbContext _context;
        public FavoriteVehiclesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FavoriteVehicle> AddAsync(FavoriteVehicle favoriteVehicle)
        {
            await _context.FavoriteVehicles.AddAsync(favoriteVehicle);
            await _context.SaveChangesAsync();

            return favoriteVehicle;
        }

        public async Task<FavoriteVehicle?> GetByIdAsync(string userId, int vehicleId)
        {
            return await _context.FavoriteVehicles
                .FirstOrDefaultAsync(fv => fv.UserId == userId && fv.VehicleId == vehicleId);
        }

        public async Task<List<int>> GetFavoriteVehicleIds(string userId)
        {
            return await _context.FavoriteVehicles
                .Where(fv => fv.UserId == userId)
                .Select(fv => fv.VehicleId)
                .ToListAsync();
        }

        public async Task<FavoriteVehicle> RemoveAsync(FavoriteVehicle favoriteVehicle)
        {
            _context.FavoriteVehicles.Remove(favoriteVehicle);
            await _context.SaveChangesAsync();

            return favoriteVehicle;
        }
    }
}
