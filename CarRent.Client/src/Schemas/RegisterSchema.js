import * as yup from 'yup'

const phoneRegex = /^(\+?[0-9\s-]*)$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 


export const RegisterSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    username: yup.string().required('Username is required'),
    email: yup.string()
        .matches(emailRegex, 'Please enter a valid email')
        .required('Email is required'),
    phone: yup.string()
        .matches(phoneRegex, 'Please enter a valid phone number')
        .required('Phone number is required'),
    password: yup.string()
        .required('Password is required')
        .min(8,'Password must be atleast 8 characters'),
    confirmPassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')],'Passwords must match')
}).required()