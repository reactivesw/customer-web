import http from './http'
import tokenManager from './tokenManager'

// Error codes
export const ERRORES = {
  USER_EXIST: 'USER_EXIST',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  PASSWORD_NOT_SECURE: 'PASSWORD_NOT_SECURE',
  PASSWORD_NOT_MATCH: 'PASSWORD_NOT_MATCH'
}

// a pattern for simulating string enums in typescript, http://stackoverflow.com/a/41631732
const SignInMethod = {
  Email: '/auth/signin' as 'Email',
  Google: '/auth/signin/google' as 'Google',
  FB: '/auth/signin/facebook' as 'FB'
}

/**
 * Server responses:
 * {"code":10002,"message":"customer already exist."}
 */
const SIGN_UP = '/auth/signup'
export async function signUp(email, password) {
  if (!isPasswordSecure(password)) {
    throw new Error(ERRORES.PASSWORD_NOT_SECURE)
  }

  const data = { email, password }
  try {
    const response = await http.post(SIGN_UP, data)
    if (response.status === 200) {
      // sign in success, route to login page
      return true
    }
  } catch (error) {
    if (error.response.data) {
      switch (error.response.data.code) {
        case 10002:
          throw new Error(ERRORES.USER_EXIST)
        default:
          throw error
      }
    } else {

    }
  }
}

export function signOut() {
  tokenManager.setToken( undefined )
  // no need to sign out Google for this app
}

export async function emailSignIn(email, password) {
  if (!isPasswordSecure(password)) {
    throw new Error(ERRORES.PASSWORD_NOT_SECURE)
  }

  try {
    const params = { email, password }
    return await signIn( SignInMethod.Email, params )
  } catch (error) {
    // server response error
    if (error.response) {
      switch (error.response.data.code) {
        case 10001:
          throw new Error(ERRORES.USER_NOT_FOUND)
        case 10003:
          throw new Error(ERRORES.PASSWORD_NOT_MATCH)
        default:
          throw error
      }
    }
  }
}

export interface GoogleSignInRequest {
  token: string
}

export async function googleSignIn(request: GoogleSignInRequest) {
  return await signIn( SignInMethod.Google, request )
}

export interface FacebookSignInRequest {
  accessToken: string,
  expiresIn: string,
  signedRequest: string,
  userID: string
}

export async function facebookSignIn( request: FacebookSignInRequest ) {
  return await signIn( SignInMethod.FB, request )
}

async function signIn( signInMethod: keyof typeof SignInMethod, params ) {
  const response = await http.post( signInMethod, params )
  if (response) {
    tokenManager.setToken( response.data.token )
    return response.data.customerView
  }
}

function isPasswordSecure(password: string) {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/
  return re.test(password)
}
