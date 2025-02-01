import * as yup from 'yup';

export const PaymentSchema = yup.object({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    pickup: yup.object({
        city: yup.string().required('Pickup city is required'),
        date: yup.string()
            .required('Pickup date is required')
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
        time: yup.string().required('Pickup time is required')
    }),
    dropoff: yup.object({
        city: yup.string().required('Drop-off city is required'),
        date: yup.string()
            .required('Drop-off date is required')
            .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
        time: yup.string().required('Drop-off time is required')
    }),
    cardNumber: yup.string()
        .required('Card number is required')
        .test('len', 'Card number must be 16 digits', val => val?.replace(/\D/g, '').length === 16),
    expiration: yup.string()
        .required('Expiration date is required')
        .test('format', 'Invalid expiration date (MM/YY)', val => {
            if (!val) return false;
            const digits = val.replace(/\D/g, '');
            if (digits.length !== 4) return false;
            const month = parseInt(digits.slice(0, 2));
            return month >= 1 && month <= 12;
        }),
    cardHolder: yup.string().required('Card holder name is required'),
    cvc: yup.string()
        .required('CVC is required')
        .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
}).required();