using CarRent.Server.Dtos.Reviews;
using CarRent.Server.Enums;
using CarRent.Server.Extensions;
using CarRent.Server.Interfaces;
using CarRent.Server.Mappers;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IRentalRepository _rentalRepo;
        private readonly IReviewRepository _reviewRepo;
        public ReviewsController(IRentalRepository rentalRepo, IReviewRepository reviewRepo)
        {
            _rentalRepo = rentalRepo;
            _reviewRepo = reviewRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostReview([FromBody] CreateReviewDto reviewDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.GetUserId();

            var rental = await _rentalRepo.GetByIdAsync(reviewDto.RentalId);

            if (rental == null || userId != rental.UserId)
            {
                return BadRequest("You have not rented this vehicle");
            }
            if (rental.Status != RentalStatus.Completed)
            {
                return BadRequest("You can only review a vehicle after you have returned it");
            }

            var existingReview = await _reviewRepo.GetUserReviewForVehicleAsync(userId, rental.VehicleId);
            if (existingReview != null)
            {
                return BadRequest("You have already reviewed this vehicle!");
            }

            var review = reviewDto.ToReview();
            review.UserId = userId;
            review.VehicleId = rental.VehicleId;

            await _reviewRepo.CreateAsync(review);

            return Ok(review.ToReviewDto());
        }

        [HttpGet("{vehicleId}")]
        [Authorize]
        public async Task<IActionResult> GetVehicleReviews([FromRoute] int vehicleId)
        {
            var reviews = await _reviewRepo.GetVehicleReviewsAsync(vehicleId);
            var reviewsDto = reviews.Select(r => r.ToReviewDto());

            return Ok(reviewsDto);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllReviews()
        {
            var reviews = await _reviewRepo.GetAllAsync();
            var reviewsDto = reviews.Select(r => r.ToReviewDto());

            return Ok(reviewsDto);
        }

        [HttpGet("{vehicleId}/{reviewId}")]
        [Authorize]
        public async Task<IActionResult> GetReviewById([FromRoute] int vehicleId, [FromRoute] int reviewId)
        {
            var review = await _reviewRepo.GetByIdAsync(reviewId, vehicleId);

            if (review == null)
            {
                return NotFound("Review was not found");
            }

            return Ok(review.ToReviewDto());
        }
    }
}
