import axios from "axios"

const fetchAllBookings = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get('/api/admin/view-bookings', options)
    return response.data
}


const fetchAllUsers = async (token) => {

    let options = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }


    const response = await axios.get('/api/admin/view-users', options)
    return response.data
}


const adminService = { fetchAllBookings, fetchAllUsers }


export default adminService