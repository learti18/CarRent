﻿using System.ComponentModel.DataAnnotations;

namespace CarRent.Server.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        public string? Username { get; set; }
        
        [Required]        
        public string? Password { get; set; }

        [Required]
        public string DeviceId { get; set; } = string.Empty;
    }
}
