using CarRent.Server.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace CarRent.Server.Service
{
    public class ImageService : IImageService
    {
        private readonly Cloudinary _cloudinary;

        public ImageService()
        {
            var account = new Account(
                "dzdv6ub55",
    "379955789991324",
    "CciVJv-3M-pM82s1qyVFBL5Y7e4"
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> SaveImageAsync(IFormFile imageFile, string folder)
        {
            if(imageFile == null || imageFile.Length == 0)
                throw new ArgumentException("Image file cannot be null or empty.");

            using var stream = imageFile.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(imageFile.FileName, stream),
                Folder = folder,
                UseFilename = true,
                UniqueFilename = true,
                Overwrite = false
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.AbsoluteUri;
        }

        public void DeleteImage(string imageUrl)
        {
          
        }

    }
}
