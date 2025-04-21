using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRent.Server.Data;
using CarRent.Server.Mappers;
using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Interfaces;
using Microsoft.AspNetCore.Authorization;
using CarRent.Server.Extensions;

namespace CarRent.Server.Controllers
{
    [Route("api/vehicles")]
    [ApiController]
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleRepository _vehicleRepo;
        private readonly IImageService _imageService;
        private readonly ILogger<VehiclesController> _logger;
        private readonly IFavoriteVehiclesRepository _favoriteRepo;

        public VehiclesController(
            IVehicleRepository vehicleRepo,
            IImageService imageService,
            ILogger<VehiclesController> logger,
            IFavoriteVehiclesRepository favoriteRepo)
        {
            _vehicleRepo = vehicleRepo;
            _imageService = imageService;
            _logger = logger;
            _favoriteRepo = favoriteRepo;
        }

        [HttpGet]
        // [Authorize (Roles = "Admin")]
        public async Task<IActionResult> GetAllVehicles()
        {
            var vehicles = await _vehicleRepo.GetAllAsync();
            var vehiclesDto = vehicles.Select(vehicle => vehicle.ToVehicleDto());
            return Ok(vehiclesDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle([FromRoute] int id)
        {
            var vehicle = await _vehicleRepo.GetByIdAsync(id);
            if (vehicle == null)
            {
                return NotFound("Vehicle not found!");
            }
            var userId = User.GetUserId();
            var isFavorite = await _favoriteRepo.IsFavorite(userId, id);
            var vehicleDto = vehicle.ToVehicleDto();
            vehicleDto.IsFavorite = isFavorite;

            return Ok(vehicleDto);
        }

        [HttpGet("available")]
        [Authorize]
        public async Task<IActionResult> GetAvailableVehicles(
            [FromQuery] VehicleQueryDto query)
        {
            var userId = User.GetUserId();

            var vehicles = await _vehicleRepo.GetAvailableVehiclesAsync(query, userId);

            var favoriteVehicles = await _favoriteRepo.GetFavoriteVehicleIds(userId);

            var vehicleDtos = vehicles.Select(vehicle =>
            {
                var vehicleDto = vehicle.ToVehicleDto();
                vehicleDto.IsFavorite = favoriteVehicles.Contains(vehicle.Id);
                return vehicleDto;
            });

            return Ok(vehicleDtos);
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateVehicle([FromForm] CreateVehicleDto vehicleDto)
        {
            try
            {
                _logger.LogInformation("Starting vehicle creation process");

                // Convert DTO to model (without images)
                var vehicle = vehicleDto.ToVehicleModel();

                // Handle image uploads
                if (vehicleDto.Images != null && vehicleDto.Images.Any())
                {
                    _logger.LogInformation($"Processing {vehicleDto.Images.Count} images");
                    vehicle.Images = new List<string>();

                    foreach (var image in vehicleDto.Images)
                    {
                        try
                        {
                            if (image.Length > 0)
                            {
                                var imageUrl = await _imageService.SaveImageAsync(image, "vehicles");
                                vehicle.Images.Add(imageUrl);
                                _logger.LogInformation($"Image saved successfully: {imageUrl}");
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Error saving image");
                            // Continue with other images even if one fails
                        }
                    }
                }

                // Create the vehicle
                var createdVehicle = await _vehicleRepo.CreateAsync(vehicle);
                _logger.LogInformation($"Vehicle created successfully with ID: {createdVehicle.Id}");

                return CreatedAtAction(
                    nameof(GetVehicle),
                    new { Id = createdVehicle.Id },
                    createdVehicle.ToVehicleDto()
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating vehicle");
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "An error occurred while creating the vehicle"
                );
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateVehicle([FromRoute] int id, [FromForm] UpdateVehicleDto vehicleDto)
        {
            try
            {
                var vehicle = await _vehicleRepo.UpdateAsync(id, vehicleDto);
                if (vehicle == null)
                {
                    return NotFound("Vehicle not found!");
                }
                return Ok(vehicle.ToVehicleDto());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] int id)
        {
            var vehicle = await _vehicleRepo.DeleteAsync(id);
            if (vehicle == null)
            {
                return NotFound("Vehicle not found!");
            }
            return NoContent();
        }
    }
}
