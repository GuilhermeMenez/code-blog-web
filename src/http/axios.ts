import axios, { isAxiosError } from 'axios'
import { createApiError, isApiErrorResponse, type ApiError } from '@/types/api-error.types'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500
      const data = error.response?.data

      // Validação segura com type guard
      const errorData = isApiErrorResponse(data) ? data : {}

      const apiError: ApiError = createApiError({
        message: errorData.message ?? error.message ?? 'Unexpected error',
        status,
        code: errorData.code,
        details: errorData.details,
      })

      return Promise.reject(apiError)
    }

    // Erros não-Axios (ex: network error)
    return Promise.reject(
      createApiError({
        message: 'Connection error. Check your internet connection.',
        status: 0,
      })
    )
  }
)
