import http from './http'

const SIGN_IN = '/customers/signin' // TODO: will move to auth endpoint.

export async function googleSignIn(id_token) {
  const params = { gToken: id_token }
  const response = await http.post(SIGN_IN, {}, { params })
  return response.data
}
