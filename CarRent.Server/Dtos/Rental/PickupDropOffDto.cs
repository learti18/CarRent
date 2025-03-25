using System.ComponentModel.DataAnnotations;

namespace CarRent.Server.Dtos.Rental
{
    public class PickupDropOffDto
    {
        public string City { get; set; }
        public DateTime DateTime { get; set; }
    }
}
