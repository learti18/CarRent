using System.ComponentModel.DataAnnotations.Schema;

namespace CarRent.Server.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int VehicleId { get; set; }
        public int RentalId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime DateCreated { get; set; }

        public ApplicationUser User { get; set; }
        public Vehicle Vehicle { get; set; }
        public Rental Rental { get; set; }
    }
}
