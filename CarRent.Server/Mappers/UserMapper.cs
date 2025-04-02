using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRent.Server.Dtos.Account;
using CarRent.Server.Models;

namespace CarRent.Server.Mappers
{
    public static class UserMapper
    {
        public static UserProfileDto ToProfileDto(this ApplicationUser user)
        {
            return new UserProfileDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImage = user.ProfileImageUrl,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            };
        }
    }
}