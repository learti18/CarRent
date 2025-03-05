using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CarRent.Server.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
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

        [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
        public List<string> Images { get; set; } = new List<string>();

        public List<VehicleFeature> Features { get; set; } = new List<VehicleFeature>();
    }
}
