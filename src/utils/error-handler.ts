import { AxiosError } from 'axios'
import type { ApiError } from '@/types/common.types'

interface ApiErrorResponse {
  message?: string
  error?: string
  code?: string
}

export function handleApiError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined

    return {
      message: responseData?.message || responseData?.error || error.message || 'Erro de conexão com o servidor',
      code: responseData?.code || error.code,
      status: error.response?.status,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    }
  }

  return {
    message: 'Erro desconhecido',
  }
}
