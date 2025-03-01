using System.ComponentModel.DataAnnotations;

namespace CarRent.Server.Dtos.Account
{
    public class RegisterDto
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public string? Password { get; set; }

        [Required]
        [Phone]
        public string? Phone { get; set; }
    }
}
