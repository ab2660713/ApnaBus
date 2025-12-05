import axios from 'axios'


const register = async (formData) => {
    const response = await axios.post("/api/auth/register", formData)
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', response.data.token)
    return response.data

}

const login = async (formData) => {
    const response = await axios.post("/api/auth/login", formData)

    // Save full user
    localStorage.setItem('user', JSON.stringify(response.data))

    // Save token separately
    localStorage.setItem('token', response.data.token)

    return response.data
}


const authService = {
    register, login
}

export default authService