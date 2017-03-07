import http from './http'
import tokenStorage from './tokenStorage'

// Error codes
export const ERRORES = {
  USER_EXIST: 'USER_EXIST',
  USER_NOT_FOUND: 'USER_NOT_FOUND'
}

/**
 * Server responses:
 * {"code":10002,"message":"customer already exist."}
 */
const SIGN_UP = '/auth/signup'
export async function signUp(email, password) {
  const data = { email, password }
  try {
    const response = await http.post(SIGN_UP, data)
    if (response) {
      tokenStorage.token = response.data.token
      return response.data
    }
  } catch (error) {
    switch (error.response.body.code) {
      case 10002:
        throw new Error(ERRORES.USER_EXIST)
      // TODO: password not secure
      default:
        throw error
    }
  }
}

export function signOut() {
  tokenStorage.token = null
  // no need to sign out Google for this app
}

const SIGN_IN = '/auth/signin'

export async function emailSignIn(email, password) {
  // TODO: make sure it works after api ready
  try {
    const params = { email, password }
    return await signIn(params)
  } catch (error) {
    switch (error.response.status) {
      case 500:
        throw new Error(ERRORES.USER_NOT_FOUND)
      default:
        throw error
    }
  }
}

export async function googleSignIn(id_token) {
  const params = { gToken: id_token }
  return await signIn(params)
}

// TODO: wait for facebook sign in api
// const SIGN_IN = '/auth/signin'
// export async function facebookSignIn(id_token) {
//   const params = { gToken: id_token }
//   const response = await http.post(SIGN_IN, {}, { params })
//   return response.data
// }

async function signIn(params) {
  const response = await http.post(SIGN_IN, {}, { params })

  if (response) {
    tokenStorage.token = response.data.token
    return response.data
  }
}
