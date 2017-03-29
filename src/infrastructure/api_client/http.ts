/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Alan Zhang @zcfan

  Build docker image
*/

import axios from 'axios'
import tokenManager from './tokenManager'

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
  .then( ( token ) => {
    if ( typeof configWithToken.headers === 'object' ) {
      configWithToken.headers.Authorization = 'Bearer ' + token
    } else {
      configWithToken.headers = { 'Authorization': 'Bearer ' + token }
    }
    return configWithToken
  })
}

export default instanceWithToken
