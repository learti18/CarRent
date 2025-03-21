﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarRent.Server.Models
{
    public class RefreshToken
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Token { get; set; } = string.Empty;

        [Required]
        public string DeviceId { get; set; } = string.Empty;
        
        public DateTime ExpiryTime { get; set; }

        [Required]
        public string UserId { get; set; }
        
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        public bool isExpired => DateTime.UtcNow >= ExpiryTime;
    }
}
