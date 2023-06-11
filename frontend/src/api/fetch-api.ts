import axios, { HttpStatusCode } from 'axios'
import { clearUser, getUser } from '../utils/local-storage.utils'

export interface FetchParams {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any // eslint-disable-line
}

interface Headers {
  [key: string]: string
}

const fetchApi = async (params: FetchParams) => {
  const headers: Headers = {}
  // By default, if we have a accessToken in the session storage, let's use that for authenticated requests
  const user = getUser()
  const accessToken = user?.accessToken

  // Set the header for authentication.
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const axiosInstance = axios.create({ headers })
  const { path, method, body } = params
  const rootUrl = import.meta.env.VITE_BASE_URL
  let req

  switch (method) {
    case 'POST':
      req = axiosInstance.post(`${rootUrl}${path}`, body)
      break
    case 'PUT':
      req = axiosInstance.put(`${rootUrl}${path}`, body)
      break
    case 'DELETE':
      req = axiosInstance.delete(`${rootUrl}${path}`)
      break
    default:
      req = axiosInstance.get(`${rootUrl}${path}`)
  }

  const { data, status } = await req
  // 401 unauthorized -> authentication required
  const isUnauthorizedRes = status === HttpStatusCode.Unauthorized

  if (isUnauthorizedRes) {
    clearUser()
  }

  return data
}

export default fetchApi
