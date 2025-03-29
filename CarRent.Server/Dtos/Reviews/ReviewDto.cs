using CarRent.Server.Models;

namespace CarRent.Server.Dtos.Reviews
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int VehicleId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime DateCreated { get; set; }
        public ApplicationUser User { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}
