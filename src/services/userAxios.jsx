import axiosInstance from "../config/axiosInstance"

export const getProducts = async()=>{
    try {
        const response = await axiosInstance.get('/products')
        return response.data
    } catch (error) {
        console.log(error,'this is hte error we got here')
        return error
    }
} 

export const registerUser = async(data)=>{
    try {
        const response = await axiosInstance.post('/users',data)
        return response
    } catch (error) {
        console.log(error,'this is the registration error')
        return error
    }
}

export const loginUser = async(data)=>{
    try {
        const response = await axiosInstance.post('/auth/login',data)
        return response
    } catch (error) {
        console.log(error,'this is the login error')
        return error
    }
}

export const getProductDetails = async(id)=>{
    try {
        console.log(id ,'this is the id')
        const response = await axiosInstance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}