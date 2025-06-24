import axios from 'axios'

const url = 'https://fakestoreapi.com'

const axiosInstance = axios.create({
    baseURL: url,
})

export default axiosInstance