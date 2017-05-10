import http from './http'
import tokenManager from './tokenManager'
import Utils from './utils'

// Error codes
export const USER_EXIST = 'auth/USER_EXIST'
export const USER_NOT_FOUND = 'auth/USER_NOT_FOUND'
export const PASSWORD_NOT_VALID = 'auth/PASSWORD_NOT_VALID'
export const PASSWORD_NOT_MATCH = 'auth/PASSWORD_NOT_MATCH'
export const INVALID_EMAIL = 'auth/INVALID_EMAIL'

const ACCOUNT_LENGTH_LIMIT = 64
const SIGN_UP_API_URL = '/auth/signup'
const UP_DATE_PASSWORD_ACTION_NAME = 'updatePassword'

// a pattern for simulating string enums in typescript, http://stackoverflow.com/a/41631732
const LoginMethod = {
  Email: '/auth/signin' as 'Email',
  Google: '/auth/signin/google' as 'Google',
  FB: '/auth/signin/facebook' as 'FB'
}

export interface GoogleLoginRequest {
  token: string
}

export interface FacebookLoginRequest {
  accessToken: string,
  expiresIn: string,
  signedRequest: string,
  userID: string
}

export interface UpdatePasswordRequest {
  customerId: string,
  version: number,
  oldPassword: string,
  newPassword: string
}

/**
 * Sign Up
 * @param email
 * @param password
 * @returns {Promise<boolean>}
 */
export async function signUp(email, password) {
  if (!isPasswordValid(password)) {
    throw new Error(PASSWORD_NOT_VALID)
  }
  if (email.length > ACCOUNT_LENGTH_LIMIT) {
    throw new Error(INVALID_EMAIL)
  }

  const data = { email, password }
  try {
    const response = await http.post(SIGN_UP_API_URL, data)
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

/**
 * Email Login
 * @param email
 * @param password
 * @returns {Promise<any>}
 */
export async function emailLogin(email, password) {
  if (!isPasswordValid(password)) {
    throw new Error(PASSWORD_NOT_VALID)
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

/**
 * Google login
 * @param request
 * @returns {Promise<any>}
 */
export async function googleLogin(request: GoogleLoginRequest) {
  return await login(LoginMethod.Google, request)
}

/**
 * Facebook login
 * @param request
 * @returns {Promise<any>}
 */
export async function facebookLogin(request: FacebookLoginRequest) {
  return await login(LoginMethod.FB, request)
}

/**
 * Login
 * @param loginMethod
 * @param params
 * @returns {Promise<any>}
 */
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

/**
 * Logout
 */
export function logout() {
  tokenManager.setToken(undefined)
  // no need to logout Google for this app
}

/**
 * Update password
 * @param request
 * @returns {Promise<AxiosPromise|any>}
 */
export async function updatePassword(request: UpdatePasswordRequest) {
  if (!isPasswordValid(request.newPassword)) {
    throw new Error(PASSWORD_NOT_VALID)
  }

  const actionFields = {
    oldPassword: request.oldPassword,
    newPassword: request.newPassword
  }
  const updatePasswordAction = Utils.buildAction(UP_DATE_PASSWORD_ACTION_NAME, actionFields)
  return Utils.makeUpdateRequest(`/auth/${request.customerId}`, request.version, [updatePasswordAction])
}

/**
 * helper function to detect is password valid
 * 8-16 long, has digital and letter
 *
 * @param password
 * @returns {boolean}
 */
function isPasswordValid(password: string) {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=\S+$).{8,16}$/
  return re.test(password)
}
