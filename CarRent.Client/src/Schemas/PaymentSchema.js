import * as yup from 'yup';

export const PaymentSchema = yup.object({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    pickup: yup.object({
        city: yup.string().required('Pickup city is required'),
        date: yup.string().required('Pickup date is required'),
        time: yup.string().required('Pickup time is required')
    }),
    dropoff: yup.object({
        city: yup.string().required('Drop-off city is required'),
        date: yup.string().required('Drop-off date is required'),
        time: yup.string().required('Drop-off time is required')
    }),
    cardNumber: yup.string()
        .required('Card number is required')
        .matches(/^\d{16}$/, 'Card number must be 16 digits'),
    expiration: yup.string()
        .required('Expiration date is required')
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiration date (MM/YY)'),
    cardHolder: yup.string().required('Card holder name is required'),
    cvc: yup.string()
        .required('CVC is required')
        .matches(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
    newsletter: yup.boolean(),
    termsConditions: yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions')
}).required();