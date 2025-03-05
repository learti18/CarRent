using Microsoft.AspNetCore.Http;

namespace CarRent.Server.Interfaces
{
    public interface IImageService
    {
        Task<string> SaveImageAsync(IFormFile imageFile);
        void DeleteImage(string imageUrl);
    }
}
