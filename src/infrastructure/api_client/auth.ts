import http from './http'
import tokenManager from './tokenManager'

// Error codes
export const USER_EXIST = 'auth/USER_EXIST'
export const USER_NOT_FOUND = 'auth/USER_NOT_FOUND'
export const PASSWORD_NOT_SECURE = 'auth/PASSWORD_NOT_SECURE'
export const PASSWORD_NOT_MATCH = 'auth/PASSWORD_NOT_MATCH'

// a pattern for simulating string enums in typescript, http://stackoverflow.com/a/41631732
const LoginMethod = {
  Email: '/auth/signin' as 'Email',
  Google: '/auth/signin/google' as 'Google',
  FB: '/auth/signin/facebook' as 'FB'
}

/**
 * Server responses:
 * {"code":10002,"message":"customer already exist."}
 */
const SIGN_UP = '/auth/signup'
export async function signUp (email, password) {
  if (!isPasswordSecure(password)) {
    throw new Error(PASSWORD_NOT_SECURE)
  }

  const data = {email, password}
  try {
    const response = await http.post(SIGN_UP, data)
    if (response.status === 200) {
      // login success
      return true
    }
  } catch (e) {
    if (e.response && e.response.data) {
      switch (e.response.data.code) {
        case 10002:
          throw new Error(USER_EXIST)
      }
    }
    throw e
  }
}

export function logout () {
  tokenManager.setToken(undefined)
  // no need to logout Google for this app
}

export async function emailLogin (email, password) {
  if (!isPasswordSecure(password)) {
    throw new Error(PASSWORD_NOT_SECURE)
  }

  try {
    const params = {email, password}
    return await login(LoginMethod.Email, params)
  } catch (e) {
    // server response error
    if (e.response && e.response.data) {
      switch (e.response.data.code) {
        case 10001:
          throw new Error(USER_NOT_FOUND)
        case 10003:
          throw new Error(PASSWORD_NOT_MATCH)
      }
    }
    throw e
  }
}

export interface GoogleLoginRequest {
  token: string
}

export async function googleLogin (request: GoogleLoginRequest) {
  return await login(LoginMethod.Google, request)
}

export interface FacebookLoginRequest {
  accessToken: string,
  expiresIn: string,
  signedRequest: string,
  userID: string
}

export async function facebookLogin (request: FacebookLoginRequest) {
  return await login(LoginMethod.FB, request)
}

async function login (loginMethod: keyof typeof LoginMethod, params) {
  const response = await http.post(loginMethod, params)
  if (response) {
    tokenManager.setToken(response.data.token)
    return response.data.customerView
  }
}

function isPasswordSecure (password: string) {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/
  return re.test(password)
}
