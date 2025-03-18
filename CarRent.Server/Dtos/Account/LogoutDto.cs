using System.ComponentModel.DataAnnotations;

namespace CarRent.Server.Dtos.Account
{
    public class LogoutDto
    {
        [Required]
        public string DeviceId { get; set; }
    }
}
