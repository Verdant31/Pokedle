import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api` : 'http://localhost:3000/api'

export const api = axios.create({
    baseURL: apiUrl
})