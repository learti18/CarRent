namespace CarRent.Server.Dtos.Vehicles
{
    public class RentalVehicleDto
    {
        public int Id { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public string FuelType { get; set; } = string.Empty;
        public string Transmission { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public string MainImage { get; set; } = string.Empty;
    }
}
