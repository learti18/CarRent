using CarRent.Server.Models;

namespace CarRent.Server.Dtos.Reviews
{
    public class ReviewResponseDto
    {
        public int Id { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public string Username { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
