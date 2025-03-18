using CarRent.Server.Models;

namespace CarRent.Server.Interfaces
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(ApplicationUser user);
        Task<RefreshToken> GenerateRefreshToken(ApplicationUser user, string deviceId);
        Task<bool> ValidateRefreshToken(string userId, string refreshToken, string deviceId);
        Task<string> GetUserIdFromRefreshToken(string refreshToken);
        Task RevokeRefreshToken(string userId, string deviceId);
        Task RevokeAllRefreshTokens(string userId);

    }
}
