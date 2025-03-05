using System.ComponentModel.DataAnnotations.Schema;

namespace CarRent.Server.Models
{
    public class VehicleFeature
    {
        public int Id { get; set; }
        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }
        public string Name { get; set; } = string.Empty;
        public Vehicle? MyProperty { get; set; }
    }
}
