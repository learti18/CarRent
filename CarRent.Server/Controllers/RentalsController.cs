using CarRent.Server.Dtos.Rental;
using CarRent.Server.Enums;
using CarRent.Server.Extensions;
using CarRent.Server.Helpers;
using CarRent.Server.Interfaces;
using CarRent.Server.Mappers;
using CarRent.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.Server.Controllers
{
    [Route("api/rentals")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly IRentalRepository _rentalRepo;
        private readonly IVehicleRepository _vehicleRepo;
        private readonly IPaymentRepository _paymentRepo;
        public RentalsController(IRentalRepository rentalRepo, IVehicleRepository vehicleRepo, IPaymentRepository paymentRepo)
        {
            _rentalRepo = rentalRepo;
            _vehicleRepo = vehicleRepo;
            _paymentRepo = paymentRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllRentals()
        {
            IEnumerable<Rental> rentals;

            if (User.IsInRole("Admin"))
            {
                rentals = await _rentalRepo.GetAllAsync();
            }
            else
            {
                var userId = User.GetUserId();
                rentals = await _rentalRepo.GetUserRentalsAsync(userId);
            }

            var rentalsDto = rentals.Select(r => r.ToRentalDto());

            return Ok(rentalsDto);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetRentalById(int id)
        {
            try
            {
                var userId = User.GetUserId();
                var rentalModel = await _rentalRepo.GetByIdAsync(id);

                if (rentalModel == null)
                    return NotFound();

                if(rentalModel.UserId != userId && !User.IsInRole("Admin"))
                    return Unauthorized("You dont have access to this rental!");

                return Ok(rentalModel.ToRentalDto());
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRental([FromBody] CreateRentalDto createRentalDto)
        {
            try
            {
                bool isAvailable = await _rentalRepo.IsVehicleAvailable(createRentalDto.VehicleId,
                                                                createRentalDto.Pickup.DateTime,
                                                                createRentalDto.DropOff.DateTime);

                if (!isAvailable)
                    return BadRequest("Vehicle is not available for the selected dates");

                var userId = User.GetUserId();

                var vehicle = await _vehicleRepo.GetByIdAsync(createRentalDto.VehicleId);
                var dailyRate = vehicle.Price;


                decimal amount = RentalCostCalculator.CalculateAmount(dailyRate, createRentalDto.Pickup.DateTime, createRentalDto.DropOff.DateTime);

                var paymentModel = createRentalDto.Payment.ToPaymentModel();

                await _paymentRepo.CreateAsync(paymentModel,amount,userId);

                var rentalModel = createRentalDto.ToRentalModel();
                rentalModel.PaymentId = paymentModel.Id;
                rentalModel.Status = RentalStatus.Upcoming;
                rentalModel.Amount = amount;
                rentalModel.UserId = userId;

                await _rentalRepo.CreateAsync(rentalModel);

                return CreatedAtAction(nameof(GetRentalById), new { id = rentalModel.Id }, rentalModel.ToRentalDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}/cancel")]
        [Authorize]
        public async Task<IActionResult> CancelRental(int id)
        {
            var userId = User.GetUserId();
            var rental = await _rentalRepo.GetByIdAsync(id);

            if(rental == null)
                return NotFound("Rental not found!");

            if (rental.UserId != userId)
                return Unauthorized("You dont have access to this rental!");

            await _rentalRepo.CancelRentalAsync(rental);

            return NoContent();
        }
    }
}
