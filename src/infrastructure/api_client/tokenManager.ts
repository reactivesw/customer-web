import axios from 'axios'
import Utils from './utils'

interface Payload {
  readonly sub: string;
  readonly subjectId: string;
  readonly anonymousId?: string;
}

/**
 * Manage token. Store token in local storage.
 * By default, get anonymous token asynchronously.
 */
class TokenManager {
  private _token?: string
  private _payload?: Payload
  private _anonymousId?: string

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
    if (token) {
      this._token = token
      localStorage.setItem('token', token)

      // decode payload
      const payload = Utils.decodeToken(token)

      // if new token is a customer token, save the previous anonymousId
      if (payload.sub === 'customer' && this._payload && this._payload.sub === 'anonymous') {
        this._anonymousId = this._payload.subjectId
      }

      const that = this
      this._payload = {
        get sub() {
          return payload.sub
        },
        get subjectId() {
          return payload.subjectId
        },
        get anonymousId() {
          return that._anonymousId
        }
      }
    } else {
      this._token = undefined
      localStorage.removeItem('token')
      this._anonymousId = undefined
      this._payload = undefined
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

  return await Utils.singleRequest('fetchAnonymousToken', () => {
    return axios.get(GET_ANONYMOUS_TOKEN, {
      baseURL: baseURL
    }).then(res => res.data)
  })
}

// multiple imports share one instance
export default new TokenManager()
