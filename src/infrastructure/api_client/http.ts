/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Alan Zhang @zcfan

  Build docker image
*/

import axios from 'axios'
import tokenStorage from './tokenStorage'

// if there is a apiServerAddr global variable setted, use it as baseURL instead of bundle one.
const baseURL = (<any>window).apiServerAddr || process.env.REST_API_URL

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: baseURL,
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
      handleError(error)
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
      handleError(error)
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
    baseURL: baseURL,
  })
  try {
    const response = await fetchAnonymousTokenPromise
    return response.data
  } catch (error) {
    handleError(error)
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

/**
 * Handle network error
 */
function handleError(error) {
    if (!error.response) {
      networkErrorHandler && networkErrorHandler(error)
    } else {
      throw error
    }
}

/**
 * Set global network error handler
 */
let networkErrorHandler
export function setNetworkErrorHandler(handler) {
  networkErrorHandler = handler
}

export default instanceWithToken
