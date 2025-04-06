using CarRent.Server.Dtos.Rental;
using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Enums;
using CarRent.Server.Models;

namespace CarRent.Server.Mappers
{
    public static class RentalMapper
    {
        public static Rental ToRentalModel(this CreateRentalDto rentalDto)
        {
            return new Rental
            {
                Name = rentalDto.Name,
                Phone = rentalDto.Phone,
                Address = rentalDto.Address,
                City = rentalDto.City,
                PickupCity = rentalDto.Pickup.City,
                PickupDate = rentalDto.Pickup.Date,
                PickupTime = rentalDto.Pickup.Time,
                DropOffCity = rentalDto.DropOff.City,
                DropOffDate = rentalDto.DropOff.Date,
                DropOffTime = rentalDto.DropOff.Time,
                VehicleId = rentalDto.VehicleId,
                PaymentId = rentalDto.Payment.Id,
                Status = RentalStatus.Upcoming,
            };
        }
        public static RentalResponseDto ToRentalDto(this Rental rental)
        {
            return new RentalResponseDto
            {
                Id = rental.Id,
                Name = rental.Name,
                Phone = rental.Phone,
                Address = rental.Address,
                City = rental.City,
                Pickup = new PickupDropOffDto
                {
                    City = rental.PickupCity,
                    Date = rental.PickupDate,
                    Time = rental.PickupTime
                },
                DropOff = new PickupDropOffDto
                {
                    City = rental.DropOffCity,
                    Date = rental.DropOffDate,
                    Time = rental.DropOffTime
                },
                Vehicle = new RentalVehicleDto
                {
                    Id = rental.Vehicle.Id,
                    Brand = rental.Vehicle.Brand,
                    Model = rental.Vehicle.Model,
                    Price = rental.Vehicle.Price,
                    FuelType = rental.Vehicle.FuelType,
                    Transmission = rental.Vehicle.Transmission,
                    MainImage = rental.Vehicle.Images.FirstOrDefault()
                },
                Amount = rental.Amount,
                Status = rental.Status.ToString(),
                UserId = rental.UserId
            };
        }
    }
}
