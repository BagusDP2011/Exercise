import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
})
export const jsonServerAPI = axios.create({
    baseURL: 'http://localhost:2000/'
})
export const jsonServerDataAPI = axios.create({
    baseURL: 'http://localhost:1000/'
})

export default axiosInstance