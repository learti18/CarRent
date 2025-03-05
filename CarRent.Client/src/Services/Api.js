import axios from "axios"

const API_BASE_URL = "http://localhost:5160/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(request => {
    const token = localStorage.getItem("token");
    
    if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
    }

    if (request.data instanceof FormData) {
        delete request.headers["Content-Type"];
        request.transformRequest = [];
        console.log('Sending FormData request');
    }

    console.log('Request:', {
        url: request.url,
        method: request.method,
        hasToken: !!token
    });

    return request;
}, error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => {
        console.log('Response:', {
            url: response.config.url,
            status: response.status
        });
        return response;
    },
    async error => {
        console.error('Response error:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data
        });

        if (error.response?.status === 401) {
            console.log('Unauthorized response, clearing token...');
            localStorage.removeItem("token");
            
            if (!window.location.pathname.includes('sign-in')) {
                window.location.href = "/sign-in";
            }
        }
        return Promise.reject(error);
    }
);

export const setAuthtoken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log('Auth token set');
    } else {
        delete api.defaults.headers.common["Authorization"];
        console.log('Auth token removed');
    }
};

export default api;