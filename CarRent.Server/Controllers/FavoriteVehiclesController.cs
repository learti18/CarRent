using CarRent.Server.Dtos.Favorites;
using CarRent.Server.Extensions;
using CarRent.Server.Interfaces;
using CarRent.Server.Models;
using CarRent.Server.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarRent.Server.Controllers
{
    [Route("api/favorite")]
    [ApiController]
    public class FavoriteVehiclesController : ControllerBase
    {
        private readonly IFavoriteVehiclesRepository _favoriteRepo;
        public FavoriteVehiclesController(IFavoriteVehiclesRepository favoriteRepo)
        {
            _favoriteRepo = favoriteRepo;
        }

        //[HttpGet]
        //[Authorize]
        //public async Task<IActionResult> GetFavoriteVehicles()
        //{
        //    var userId = User.GetUserId();

        //    var favoriteVehicles = await _favoriteRepo.GetAllAsync(userId);

        //    //var favoriteVehicles = await _favoriteRepo
        //    return Ok();
        //}

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToFavorites(CreateFavoriteDto favoriteDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.GetUserId();

            var favoriteVehicle = new FavoriteVehicle
            {
                UserId = userId,
                VehicleId = favoriteDto.VehicleId,
                // PickupDate = favoriteDto.PickupDate,
                // DropOffDate = favoriteDto.DropOffDate
            };

            await _favoriteRepo.AddAsync(favoriteVehicle);

            return Ok("Vehicle added to favorites");
        }

        [HttpDelete("{vehicleId}")]
        [Authorize]
        public async Task<IActionResult> RemoveFromFavorites([FromRoute] int vehicleId)
        {
            var userId = User.GetUserId();
            var favoriteVehicle = await _favoriteRepo.GetByIdAsync(userId, vehicleId);

            if (favoriteVehicle == null)
            {
                return NotFound("Vehicle not found in favorites");
            }

            await _favoriteRepo.RemoveAsync(favoriteVehicle);

            return Ok("Vehicle removed from favorites");
        }

    }
}
