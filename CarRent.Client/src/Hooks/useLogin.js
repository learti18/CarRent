import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';

const useLogin = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (credentials) => {
            const { data } = await api.post("/authentication/login",credentials)
            return data
        },
        onSuccess: async (data) => {
            await login(data.token)
            navigate(-1, {replace: true})
        },
        onError: (error) => {
            console.log(error)
        }

    })
}

export default useLogin;