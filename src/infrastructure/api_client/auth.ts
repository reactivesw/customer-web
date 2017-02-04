import http from './http'

const SIGN_UP = '/auth/signup'
export async function signUp(email, password) {
  const data = { email, password }
  const response = await http.post(SIGN_UP, data)
  return response.data
}

export function signOut() {
  // sign out google api if google is signed in
  const gauth2 = gapi.auth2.getAuthInstance()
  if (gauth2.isSignedIn.get()) {
    gauth2.signOut()
  }
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
