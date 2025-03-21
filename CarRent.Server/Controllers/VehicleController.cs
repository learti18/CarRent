﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRent.Server.Data;
using CarRent.Server.Mappers;
using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Interfaces;

namespace CarRent.Server.Controllers
{
    [Route("api/vehicle")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleRepository _vehicleRepo;
        private readonly IImageService _imageService;
        private readonly ILogger<VehicleController> _logger;

        public VehicleController(
            IVehicleRepository vehicleRepo,
            IImageService imageService,
            ILogger<VehicleController> logger)
        {
            _vehicleRepo = vehicleRepo;
            _imageService = imageService;
            _logger = logger;
        }

        [HttpGet]
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
            return Ok(vehicle.ToVehicleDto());
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
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
                                var imageUrl = await _imageService.SaveImageAsync(image);
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
        public async Task<IActionResult> UpdateVehicle([FromRoute] int id, [FromBody] UpdateVehicleDto vehicleDto)
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
