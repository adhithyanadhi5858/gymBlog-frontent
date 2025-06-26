import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const AxiosInstance = axios.create({
    baseURL,
    withCredentials: true, // Include cookies (if needed)
    headers: {
        "Content-Type": "application/json", // Ensure JSON format
    },
})