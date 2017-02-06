import http from './http'
import token from './token'

const SIGN_UP = '/auth/signup'
export async function signUp(email, password) {
  const data = { email, password }
  const response = await http.post(SIGN_UP, data)
  token.token = response.data.token
  return response.data
}

export function signOut() {
  token.token = null

  // sign out google api if google is signed in
  const gauth2 = gapi.auth2.getAuthInstance()
  if (gauth2.isSignedIn.get()) {
    gauth2.signOut()
  }
}

const SIGN_IN = '/auth/signin'

export async function emailSignIn(email, password) {
  // TODO: make sure it works after api ready
  const params = { email, password }
  return await signIn(params)
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
  token.token = response.data.token
  return response.data
}
