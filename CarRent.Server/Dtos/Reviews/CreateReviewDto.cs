using CarRent.Server.Models;

namespace CarRent.Server.Dtos.Reviews
{
    public class CreateReviewDto
    {
        public string Comment { get; set; }
        public int Rating { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
    }
}
