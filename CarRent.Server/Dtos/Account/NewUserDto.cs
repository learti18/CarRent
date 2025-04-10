﻿namespace CarRent.Server.Dtos.Account
{
    public class NewUserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string ProfileImageUrl { get; set; }
        public DateTime ExpiresAt { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
    }
}
