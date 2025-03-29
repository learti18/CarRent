using CarRent.Server.Dtos.Reviews;
using CarRent.Server.Models;

namespace CarRent.Server.Mappers
{
    public static class ReviewMapper
    {
        public static Review ToReview(this CreateReviewDto reviewDto)
        {
            return new Review
            {
                Comment = reviewDto.Comment,
                Rating = reviewDto.Rating,
                DateCreated = reviewDto.DateCreated
            };
        }

        public static ReviewResponseDto ToReviewDto(this Review review)
        {
            return new ReviewResponseDto
            {
                Id = review.Id,
                Username = review.User.UserName,
                Comment = review.Comment,
                Rating = review.Rating,
                DateCreated = review.DateCreated
            };
        }

    }
}
