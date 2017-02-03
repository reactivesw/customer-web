import http from './http'

const SIGN_UP = '/auth/signup'
export async function signUp(email, password) {
  const params = { email, password }
  const response = await http.post(SIGN_UP, {}, { params })
  // There may have two kinds of error
  // First is low level error like network down, server return 500
  // Second is business error like username has been taken
  // We only care the second kind here.

  // TODO: throw email has been taken error.
  // TODO: throw email not valid
  // TODO: throw password is too simple
  // TODO: throw other business errors
  return response.data
}

const SIGN_IN = '/auth/login'

export async function emailSignIn(email, password) {
  // TODO: make sure it works after api ready
  const params = { email, password }
  const response = await http.post(SIGN_IN, {}, { params })
  return response.data
}

export async function googleSignIn(id_token) {
  const params = { gToken: id_token }
  const response = await http.post(SIGN_IN, {}, { params })
  return response.data
}

// TODO: wait for facebook login api
// const SIGN_IN = '/auth/login'
// export async function facebookSignIn(id_token) {
//   const params = { gToken: id_token }
//   const response = await http.post(SIGN_IN, {}, { params })
//   return response.data
// }
