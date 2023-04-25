import axios, { HttpStatusCode } from 'axios'
import { clearJWT, getJWT, setJWT } from '../utils/jwt.utils'
import { LOCAL_AUTH_KEY } from '../hooks/useAuth'
import { queryClient } from './queryClient'

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
  const accessToken = getJWT()

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
    default:
      req = axiosInstance.get(`${rootUrl}${path}`)
  }

  const { data, status } = await req
  // 401 unauthorized -> authentication required
  const isUnauthorizedRes = status === HttpStatusCode.Unauthorized

  if (isUnauthorizedRes) {
    clearJWT()

    queryClient.removeQueries(LOCAL_AUTH_KEY)
  }

  // 200 ok -> response with credentials
  const isCredentialsRes = data && data.accessToken && data.user

  if (isCredentialsRes) {
    setJWT(data.accessToken) // in case of logout we intentionally set JWT to null
    queryClient.setQueryData(LOCAL_AUTH_KEY, data)
  }

  return data
}

export default fetchApi
