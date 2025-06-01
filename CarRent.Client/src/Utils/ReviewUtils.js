
/**
 * Calculate review statistics
 * @param {Array} reviews - Array of review objects
 * @returns {Object} Statistics object containing counts and percentages
 */
export const calculateReviewStats = (reviews) => {
  if (!reviews || reviews.length === 0) return { 
    total: 0, 
    average: 0, 
    fiveStars: 0, 
    fourStars: 0,
    threeStars: 0,
    twoStars: 0,
    oneStars: 0,
    percentages: {
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStars: 0
    }
  };

  const total = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = (sum / total).toFixed(1);
  
  const fiveStars = reviews.filter(review => review.rating === 5).length;
  const fourStars = reviews.filter(review => review.rating === 4).length;
  const threeStars = reviews.filter(review => review.rating === 3).length;
  const twoStars = reviews.filter(review => review.rating === 2).length;
  const oneStars = reviews.filter(review => review.rating === 1).length;
  
  return { 
    total, 
    average, 
    fiveStars, 
    fourStars, 
    threeStars, 
    twoStars, 
    oneStars,
    percentages: {
      fiveStars: total > 0 ? (fiveStars / total) * 100 : 0,
      fourStars: total > 0 ? (fourStars / total) * 100 : 0,
      threeStars: total > 0 ? (threeStars / total) * 100 : 0,
      twoStars: total > 0 ? (twoStars / total) * 100 : 0,
      oneStars: total > 0 ? (oneStars / total) * 100 : 0
    }
  };
};

/**
 * Filter and sort reviews based on criteria
 * @param {Array} reviews - Array of review objects
 * @param {String} searchTerm - Text to search in reviews
 * @param {Number} filterRating - Rating to filter by (0 means all ratings)
 * @param {String} sortBy - Sorting criteria (newest, oldest, highest, lowest)
 * @returns {Array} Filtered and sorted reviews
 */
export const filterAndSortReviews = (reviews, searchTerm, filterRating, sortBy) => {
  if (!reviews) return [];
  
  let filtered = [...reviews];
  
  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter(
      (review) => 
        review.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (review.vehicleMake && review.vehicleMake?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (review.vehicleModel && review.vehicleModel?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
  
  // Apply rating filter
  if (filterRating > 0) {
    filtered = filtered.filter(review => review.rating === filterRating);
  }
  
  // Apply sorting
  switch (sortBy) {
    case "newest":
      filtered.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
      break;
    case "highest":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "lowest":
      filtered.sort((a, b) => a.rating - b.rating);
      break;
    default:
      filtered.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      break;
  }
  
  return filtered;
};
