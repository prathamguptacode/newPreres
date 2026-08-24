import axios from "axios"

const baseURL = process.env.VITE_API_BASE_URL + "/api"
const api = axios.create({ baseURL })

export default api
