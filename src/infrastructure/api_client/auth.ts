import http from './http'

const SIGN_UP = '/auth/signup'
export async function signUp(email, password) {
  const params = { email, password }
  const response = await http.post(SIGN_UP, {}, { params })
  return response.data
  // TODO: server return 500, make sure this works after api repaired.
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
