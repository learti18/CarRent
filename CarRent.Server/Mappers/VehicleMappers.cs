using CarRent.Server.Dtos.Vehicles;
using CarRent.Server.Models;

namespace CarRent.Server.Mappers
{
    public static class VehicleMappers
    {
        public static VehicleResponseDto ToVehicleDto(this Vehicle vehicleModel)
        {
            return new VehicleResponseDto
            {
                Id = vehicleModel.Id,
                Brand = vehicleModel.Brand,
                Model = vehicleModel.Model,
                LicensePlate = vehicleModel.LicensePlate,
                Year = vehicleModel.Year,
                BodyType = vehicleModel.BodyType,
                FuelType = vehicleModel.FuelType,
                Transmission = vehicleModel.Transmission,
                Seats = vehicleModel.Seats,
                Images = vehicleModel.Images,
                MainImage = vehicleModel.Images.FirstOrDefault(),
                Price = vehicleModel.Price,
                Location = vehicleModel.Location,
                Features = vehicleModel.Features.Select(f => f.Name).ToList()
            };
        }
        public static Vehicle ToVehicleModel(this CreateVehicleDto createVehicleDto)
        {
            return new Vehicle
            {
                Brand = createVehicleDto.Brand,
                Model = createVehicleDto.Model,
                LicensePlate = createVehicleDto.LicensePlate,
                Year = createVehicleDto.Year,
                BodyType = createVehicleDto.BodyType,
                FuelType = createVehicleDto.FuelType,
                Transmission = createVehicleDto.Transmission,
                Seats = createVehicleDto.Seats,
                Price = createVehicleDto.Price,
                Location = createVehicleDto.Location,
                Images = new List<string>(),
                Features = createVehicleDto.Features.Select(f => new VehicleFeature { Name = f }).ToList()
            };
        }
    }
}
