using System.ComponentModel.DataAnnotations;

namespace CarRent.Server.Dtos.Rental
{
    public class PickupDropOffDto
    {
        public string City { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
    }
}
