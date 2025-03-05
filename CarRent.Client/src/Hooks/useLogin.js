import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../Services/Api';
import { toast } from 'sonner';

const useLogin = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async (credentials) => {
            try {      
                const { data } = await api.post("/authentication/login", credentials);
                return data;
            } catch (error) {
                console.error('Login error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message
                });
                
                throw error;
            }
        },
        onSuccess: async (data) => {
            if (!data.token) {
                console.error('Login response missing token:', data);
                toast.error("Login response missing authentication token");
                return;
            }
            
            try {
                const userData = await login(data.token);
                toast.success("Successfully logged in!");
                
                if (userData && userData.roles && userData.roles.includes("Admin")) {
                    navigate("/dashboard", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                toast.error("Error loading user data");
            }
        },
        onError: (error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error("Invalid username or password");
                } else if (error.response.status === 401) {
                    toast.error("Unauthorized: Please check your credentials");
                } else if (error.response.status === 500) {
                    toast.error("Server error: Please try again later");
                } else {
                    toast.error(`Login failed: ${error.response.data?.message || error.message}`);
                }
            } else if (error.request) {
                toast.error("No response from server. Please check your connection");
            } else {
                toast.error(`Login error: ${error.message}`);
            }
            
            console.error("Login error:", error);
        }
    });
};

export default useLogin;