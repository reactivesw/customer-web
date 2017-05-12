import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import tokenManager from './tokenManager'

const baseURL = process.env.REST_API_URL

// Create a http client instance with some common settings
const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: process.env.HTTP_TIMEOUT
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
