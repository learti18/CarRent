import { getOrGenerateDeviceId } from "../Utils/GenerateDeviceId"


export const authenticateWithStoredCredentials =  async (username = null) => {
    return await api.post('/auth/refresh-token',{
        deviceId: getOrGenerateDeviceId()
    })
}

export const refreshAuthToken = async () => {
    return await api.post('/auth/refresh-token', {
        deviceId: getOrGenerateDeviceId()
    })
}

export const calculateRefreshTime = (expiresAt, buffer = 30000) => {
    const expiresAtTime = new Date(expiresAt).getTime()
    return Math.max(expiresAtTime - Date.now() - buffer, 0)
}

export const formatUserData = (data) => {
    return {
        userName: data.userName,
        email: data.email,
        roles: data.roles || []
    }
}