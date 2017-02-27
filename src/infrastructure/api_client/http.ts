import axios from 'axios'
import tokenStorage from './tokenStorage'

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 3000
})

// wrap the axios instance, to append a token to every request it sent.
const instanceWithToken: any = {}

const functionsWithoutData = ['get', 'delete', 'head']
const functionsWithData = ['post', 'put', 'patch']

functionsWithoutData.forEach((method) => {
  instanceWithToken[method] = async function (url, config) {
    const configWithToken = await appendToken(config)
    let result
    try {
      return await instance[method](url, configWithToken)
    } catch (error) {
      if (!error.response) {
        networkErrorHandler && networkErrorHandler(error)
      } else {
        throw error
      }
    }
  }
})

functionsWithData.forEach((method) => {
  instanceWithToken[method] = async function (url, data, config) {
    const configWithToken = await appendToken(config)
    await appendToken(configWithToken)
    let result
    try {
      return await instance[method](url, data, configWithToken)
    } catch (error) {
      if (!error.response) {
        networkErrorHandler && networkErrorHandler(error)
      } else {
        throw error
      }
    }
  }
})

let fetchAnonymousTokenPromise
/**
 * Fetch anonymous token
 *
 * fetchAnonymousTokenPromise is for prevent duplicate request and cache result
 *
 * @returns
 */
async function fetchAnonymousToken() {
  const GET_ANONYMOUS_TOKEN = '/auth/anonymous'
  fetchAnonymousTokenPromise = axios.get(GET_ANONYMOUS_TOKEN, {
    baseURL: process.env.RS_API_URL,
  })
  try {
    const response = await fetchAnonymousTokenPromise
    return response.data
  } catch (error) {
    if (!error.response) {
      networkErrorHandler && networkErrorHandler(error)
    } else {
      throw error
    }
  }
}

/**
 * append token to provided config
 *
 * @param {any} config
 * @returns
 */
async function appendToken(config) {
  const configWithToken = Object.assign({}, config)
  // if there is no token cached, fetch a anonymousToken for any request
  if (!tokenStorage.token || tokenStorage.token === '') {
    let anonymousToken
    if (fetchAnonymousTokenPromise) {
      anonymousToken = await fetchAnonymousTokenPromise
    } else {
      anonymousToken = await fetchAnonymousToken()
    }
    tokenStorage.token = anonymousToken
  }
  if (typeof configWithToken.headers === 'object') {
    configWithToken.headers.Authorization = 'Bearer ' + tokenStorage.token
  } else {
    configWithToken.headers = {'Authorization': 'Bearer ' + tokenStorage.token}
  }
  return configWithToken
}

let networkErrorHandler
export function setNetworkErrorHandler(handler) {
  networkErrorHandler = handler
}

export default instanceWithToken
