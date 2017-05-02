import http from './http'
import tokenManager from './tokenManager'
import Utils from './utils'

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
export async function signUp(email, password) {
  if (!isPasswordSecure(password)) {
    throw new Error(PASSWORD_NOT_SECURE)
  }

  const data = { email, password }
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

export function logout() {
  tokenManager.setToken(undefined)
  // no need to logout Google for this app
}

export async function emailLogin(email, password) {
  if (!isPasswordSecure(password)) {
    throw new Error(PASSWORD_NOT_SECURE)
  }

  try {
    const params = { email, password }
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

export async function googleLogin(request: GoogleLoginRequest) {
  return await login(LoginMethod.Google, request)
}

export interface FacebookLoginRequest {
  accessToken: string,
  expiresIn: string,
  signedRequest: string,
  userID: string
}

export async function facebookLogin(request: FacebookLoginRequest) {
  return await login(LoginMethod.FB, request)
}

async function login(loginMethod: keyof typeof LoginMethod, params) {
  // add anonymousId for data merge
  const payload = await tokenManager.getPayload()
  const tempParams = Object.assign({}, params, { anonymousId: payload.subjectId })

  // send request
  const response = await http.post(loginMethod, tempParams)
  if (response) {
    tokenManager.setToken(response.data.token)
    return response.data.customerView
  }
}

export interface UpdatePasswordRequest {
  customerId: string,
  version: number,
  oldPassword: string,
  newPassword: string
}

export const UP_DATE_PASSWORD = 'updatePassword'
export async function updatePassword(request: UpdatePasswordRequest) {
  if (!isPasswordSecure(request.newPassword)) {
    throw new Error(PASSWORD_NOT_SECURE)
  }

  const actionFields = {
    oldPassword: request.oldPassword,
    newPassword: request.newPassword
  }
  const updatePasswordAction = Utils.buildAction(UP_DATE_PASSWORD, actionFields)
  return Utils.makeUpdateRequest(`/auth/${request.customerId}`, request.version, [updatePasswordAction])
}

/**
 * helper function to detect is password secure enough.
 * @param password
 * @returns {boolean}
 */
function isPasswordSecure(password: string) {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,}$/
  return re.test(password)
}
