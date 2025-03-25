using CarRent.Server.Data;
using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Interfaces;
using CarRent.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using CarRent.Server.Enums;
using CarRent.Server.Extensions;

namespace CarRent.Server.Repository
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IImageService _imageService;
        private readonly ILogger<VehicleRepository> _logger;

        public VehicleRepository(
            ApplicationDbContext context,
            IImageService imageService,
            ILogger<VehicleRepository> logger)
        {
            _context = context;
            _imageService = imageService;
            _logger = logger;
        }

        public async Task<Vehicle> CreateAsync(Vehicle vehicle)
        {
            try
            {
                await _context.Vehicles.AddAsync(vehicle);
                await _context.SaveChangesAsync();

                return vehicle;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Vehicle?> DeleteAsync(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.Features)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
            {
                return null;
            }

            _context.VehicleFeatures.RemoveRange(vehicle.Features);
            _context.Vehicles.Remove(vehicle);

            await _context.SaveChangesAsync();

            return vehicle;
        }

        public async Task<List<Vehicle>> GetAllAsync()
        {
            try
            {
                // Use a more error-resilient approach
                var vehicles = new List<Vehicle>();

                // Get all vehicle IDs first
                var vehicleIds = await _context.Vehicles
                    .Select(v => v.Id)
                    .ToListAsync();

                // Fetch each vehicle individually to isolate problematic records
                foreach (var id in vehicleIds)
                {
                    try
                    {
                        var vehicle = await _context.Vehicles
                            .Include(v => v.Features)
                            .AsNoTracking()
                            .FirstOrDefaultAsync(v => v.Id == id);

                        if (vehicle != null)
                        {
                            vehicles.Add(vehicle);
                        }
                    }
                    catch (JsonException ex)
                    {
                        _logger.LogError(ex, "JSON error fetching vehicle with ID {Id}", id);
                        // Skip this vehicle but continue with others
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error fetching vehicle with ID {Id}", id);
                        // Skip this vehicle but continue with others
                    }
                }

                return vehicles;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all vehicles");
                throw;
            }
        }

        public async Task<List<Vehicle>> GetAvailableVehiclesAsync(VehicleQueryDto query)
        {
            var vehicles =  _context.Vehicles
                .Include(v => v.Features)
                .AsQueryable();
            
            vehicles = vehicles.Where(v =>
                    !_context.Rentals.Any(r =>
                            r.VehicleId == v.Id &&
                            (query.PickupDate < r.DropOffDateTime && query.DropOffDate > r.PickupDateTime) &&
                            r.Status != RentalStatus.Cancelled
                        )
                    );
            vehicles = vehicles
                .ApplyFiltering(query)
                .ApplySorting(query)
                .ApplyPagination(query);

            return await vehicles.ToListAsync();
        }

        public async Task<Vehicle?> GetByIdAsync(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.Features)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
            {
                return null;
            }

            return vehicle;
        }

        public async Task<Vehicle?> UpdateAsync(int id, UpdateVehicleDto vehicleDto)
        {
            var existingVehicle = await _context.Vehicles
                .Include(v => v.Features)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (existingVehicle == null)
            {
                return null;
            }

            existingVehicle.Brand = vehicleDto.Brand;
            existingVehicle.Model = vehicleDto.Model;
            existingVehicle.LicensePlate = vehicleDto.LicensePlate;
            existingVehicle.Year = vehicleDto.Year;
            existingVehicle.BodyType = vehicleDto.BodyType;
            existingVehicle.FuelType = vehicleDto.FuelType;
            existingVehicle.Transmission = vehicleDto.Transmission;
            existingVehicle.Seats = vehicleDto.Seats;
            existingVehicle.Price = vehicleDto.Price;
            existingVehicle.Location = vehicleDto.Location;

            if (vehicleDto.Images != null && vehicleDto.Images.Any())
            {
                existingVehicle.Images = new List<string>();
                foreach (var image in vehicleDto.Images)
                {
                    var imageUrl = await _imageService.SaveImageAsync(image);
                    existingVehicle.Images.Add(imageUrl);
                }
            }

            if (existingVehicle.Features == null)
            {
                existingVehicle.Features = new List<VehicleFeature>();
            }

            existingVehicle.Features.RemoveAll(f => !vehicleDto.Features.Contains(f.Name));
            var existingFeatures = existingVehicle.Features.Select(f => f.Name).ToList();
            var newFeatures = vehicleDto.Features
                .Where(f => !existingFeatures.Contains(f))
                .Select(f => new VehicleFeature { Name = f, VehicleId = existingVehicle.Id })
                .ToList();
            existingVehicle.Features.AddRange(newFeatures);

            await _context.SaveChangesAsync();

            return existingVehicle;
        }
    }
}
