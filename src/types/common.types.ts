export interface ApiError {
  message: string
  code?: string
  status?: number
}

export interface ServiceResponse<T> {
  data: T | null
  error: ApiError | null
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}
