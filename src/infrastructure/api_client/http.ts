import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import tokenManager from './tokenManager'

export const NETWORK_ERROR = 'Network Error'

const baseURL = process.env.REST_API_URL

// Create a http client instance with some common settings
const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000 // TODO: too long, reduce it after server stable.
})

// Use interceptor to append token for every api request.
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return appendToken(config)
})

/**
 * append token to provided config
 *
 * @param {any} config
 * @returns
 */
function appendToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const configWithToken: AxiosRequestConfig = Object.assign({}, config)

  return tokenManager.getToken()
  .then((token) => {
    if (typeof configWithToken.headers === 'object') {
      configWithToken.headers.Authorization = 'Bearer ' + token
    } else {
      configWithToken.headers = { 'Authorization': 'Bearer ' + token }
    }
    return configWithToken
  })
}

export default instance
