using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user);
    }
}
