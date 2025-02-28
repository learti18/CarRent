import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5160/api/",
    headers:{
        "Content-Type": "application/json"
    }
})

export const setAuthtoken = (token) => {
    if(token){
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }else{
        delete api.defaults.headers.common["Authorization"]
    }
}

export default api