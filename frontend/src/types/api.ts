import { AxiosError } from 'axios'

export type ApiError = AxiosError<{
  error: string
  message: string
  statusCode: number
}>
