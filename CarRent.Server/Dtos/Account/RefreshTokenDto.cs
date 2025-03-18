using System.ComponentModel.DataAnnotations;

namespace CarRent.Server.Dtos.Account
{
    public class RefreshTokenDto
    {
        [Required]
        public string DeviceId { get; set; }
    }
}
