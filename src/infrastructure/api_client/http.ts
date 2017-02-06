import axios from 'axios'
import token from './token'

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 3000
})

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

async function appendToken(config) {
  const configWithToken = Object.assign({}, config)
  // if there is no token cached, fetch a anonymousToken for any request
  if (!token.token || token.token === '') {
    let anonymousToken
    if (fetchAnonymousTokenPromise) {
      anonymousToken = await fetchAnonymousTokenPromise
    } else {
      anonymousToken = await fetchAnonymousToken()
    }
    token.token = anonymousToken
  }
  if (typeof configWithToken.headers === 'object') {
    configWithToken.headers.Authorization = 'Bearer ' + token.token
  } else {
    configWithToken.headers = {'Authorization': 'Bearer ' + token.token}
  }
  return configWithToken
}

export default instanceWithToken
