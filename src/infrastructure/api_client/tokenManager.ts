import axios from 'axios'
import Utils from './utils'

interface Payload {
  readonly sub: string;
  readonly subjectId: string
}

/**
 * Manage token. Store token in local storage.
 * By default, get anonymous token asynchronously.
 */
class TokenManager {
  private _token?: string
  private _payload?: Payload

  constructor() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setToken(token)
    }
  }

  async getToken(): Promise<string> {
    // something wrong with typescript, data type not match when using this._token directly.
    let token: string = <string>this._token
    if (!this._token) {
      token = await fetchAnonymousToken()
      this.setToken(token)
    }
    return token
  }

  async getPayload(): Promise<Payload> {
    let payload = <Payload>this._payload
    if (!this._token) {
      const token = await fetchAnonymousToken()
      this.setToken(token)
      payload = <Payload>this._payload
    }
    return payload
  }

  setToken(token?: string) {
    this._token = token
    if (token) {
      localStorage.setItem('token', token)

      // decode payload
      const payload = Utils.decodeToken(token)
      this._payload = {
        get sub() {
          return payload.sub
        },
        get subjectId() {
          return payload.subjectId
        }
      }
    } else {
      localStorage.removeItem('token')
    }
  }
}

const baseURL = (<any>window).apiServerAddr || process.env.REST_API_URL

/**
 * Fetch anonymous token
 *
 * fetchAnonymousTokenPromise is for prevent duplicate request and cache result
 *
 * @returns
 */
async function fetchAnonymousToken(): Promise<string> {
  const GET_ANONYMOUS_TOKEN = '/auth/anonymous'
  return await axios.get(GET_ANONYMOUS_TOKEN, {
    baseURL: baseURL
  })
  .then(response => response.data)
}

// multiple imports share one instance
export default new TokenManager()
