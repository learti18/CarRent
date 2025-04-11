import * as yup from 'yup';

export const ReviewSchema = yup.object({
    rating: yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating cannot exceed 5'),
    reviewText: yup.string()
        .required('Review text is required')
        .min(10, 'Review must be at least 10 characters long')
        .max(500, 'Review cannot exceed 500 characters'),
}).required();