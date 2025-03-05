﻿namespace CarRent.Server.Dtos.Vehicles
{
    public class UpdateVehicleDto
    {
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string LicensePlate { get; set; } = string.Empty;
        public int Year { get; set; }
        public string BodyType { get; set; } = string.Empty;
        public string FuelType { get; set; } = string.Empty;
        public string Transmission { get; set; } = string.Empty;
        public int Seats { get; set; }
        public decimal Price { get; set; }
        public string Location { get; set; } = string.Empty;
        public bool IsBooked { get; set; }
        public List<IFormFile> Images { get; set; } = new List<IFormFile>();
        public List<string> Features { get; set; }
    }
}
