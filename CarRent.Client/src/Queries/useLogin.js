import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../Services/Api';
import { toast } from 'sonner';
import { STATUS } from '../Utils/AuthStatus';
import { getOrGenerateDeviceId } from '../Utils/GenerateDeviceId';
import { setCurrentUsername, setCurrentUser } from '../Utils/UserStore';
import { formatUserData } from '../Services/AuthService';

const useLogin = () => {
   const { login, setAuthenticationStatus } = useAuth()
   const navigate = useNavigate()

   return useMutation({
        mutationFn: async({username, password}) => {
            setAuthenticationStatus(STATUS.PENDING)

            const deviceId = getOrGenerateDeviceId()
            const response = await api.post("/auth/login", {username, password, deviceId})

            if(!response?.data) {
                throw new Error("Invalid response from server")
            }

            return response.data
        },
        onSuccess: (data) => {
            if(!data.token || !data.expiresAt){
                throw new Error("Missing token or expiration time")
            }

            setCurrentUsername(data.userName)
            setCurrentUser(data)

            const formattedUser = formatUserData(data)
            login(formattedUser, data.token, data.expiresAt)
            setAuthenticationStatus(STATUS.SUCCEEDED)
            navigate('/')
        },
        onError: (error) => {
            console.error("Login failed: ",error)
            setAuthenticationStatus(STATUS.FAILED)

            alert(error?.response?.data?.error?.message || "Login failed - please try again");
        }
   })
};

export default useLogin;