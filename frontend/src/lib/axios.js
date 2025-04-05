import axios from "axios"
export const axiosInstance =axios.create({baseURL:"http://localhost:5001/api",withCredentials:true});    // As sending cookies as well with every request
 