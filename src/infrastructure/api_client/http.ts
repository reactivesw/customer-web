import axios from 'axios'
import tokenManager from './tokenManager'

export const NETWORK_ERROR = 'Network Error'

const baseURL = process.env.REST_API_URL

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000 // TODO: too long, reduce it after server stable.
})

// wrap the axios instance, to append a token to every request it sent.
const instanceWithToken: any = {}

const functionsWithoutData = ['get', 'delete', 'head']
const functionsWithData = ['post', 'put', 'patch']

functionsWithoutData.forEach((method) => {
  instanceWithToken[method] = async function (url, config) {
    const configWithToken = await appendToken(config)
    return await instance[method](url, configWithToken)
  }
})

functionsWithData.forEach((method) => {
  instanceWithToken[method] = async function (url, data, config) {
    const configWithToken = await appendToken(config)
    return await instance[method](url, data, configWithToken)
  }
})

/**
 * append token to provided config
 *
 * @param {any} config
 * @returns
 */
async function appendToken(config) {
  const configWithToken = Object.assign({}, config)

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

export default instanceWithToken
