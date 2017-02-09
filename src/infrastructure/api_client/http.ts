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
    return instance[method](url, configWithToken)
  }
})

functionsWithData.forEach((method) => {
  instanceWithToken[method] = async function (url, data, config) {
    const configWithToken = await appendToken(config)
    await appendToken(configWithToken)
    return instance[method](url, data, configWithToken)
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
function fetchAnonymousToken() {
  const GET_ANONYMOUS_TOKEN = '/auth/anonymous'
  fetchAnonymousTokenPromise = axios.get(GET_ANONYMOUS_TOKEN, {
    baseURL: process.env.RS_API_URL,
  })
  .then((res) => {
    return res.data
  })
  return fetchAnonymousTokenPromise
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

export default instanceWithToken
