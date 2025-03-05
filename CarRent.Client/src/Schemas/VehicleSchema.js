import * as yup from 'yup';

export const VehicleSchema = yup.object({
    brand: yup.string().required('Brand is required'),
    model: yup.string().required('Model is required'),
    makeYear: yup
        .number()
        .typeError('Make year must be a number')
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .nullable()
        .integer()
        .min(1990, 'Make year must be at least 1990')
        .max(new Date().getFullYear(), `Make year cannot be after ${new Date().getFullYear()}`)
        .required('Make year is required'),
    licensePlates: yup.string().required('License Plates required'),
    pricePerDay: yup
        .number()
        .typeError('Price must be a number')
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .nullable()
        .positive('Price must be positive')
        .required('Price is required'),
    bodyType: yup.string().required('Please select a body type'),
    transmission: yup.string().required('Please select transmission type'),
    seatingCapacity: yup
        .number()
        .typeError('Seating capacity must be a number')
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .nullable()
        .min(1, 'Seating capacity must be at least 1')
        .max(8, 'Seating capacity cannot exceed 8')
        .required('Please select nr. of seats'),
    fuelCapacity: yup
        .number()
        .typeError('Fuel capacity must be a number')
        .transform((value, originalValue) => originalValue === "" ? null : value)
        .nullable()
        .integer()
        .positive('Fuel Capacity must be positive'),
    fuelType: yup.string().required('Please select fuel type'),
    location: yup.string().required('Please select location'),
    features: yup.array().of(yup.string()),
    images: yup.array()
        .min(1, 'At least one image is required')
}).required();
