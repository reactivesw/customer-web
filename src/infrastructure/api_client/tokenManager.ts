import axios from 'axios'

/**
 * Manage token. Store token in local storage.
 * By default, get anonymous token asynchronously.
 */
class TokenManager {
  private _token?: string

  constructor ( ) {
    const token = localStorage.getItem('token')
    if ( token ) {
      this._token = token
    }
  }

  async getToken ( ): Promise<string> {
    if ( !this._token ) {
      this._token = await fetchAnonymousToken( )
      localStorage.setItem('token', this._token)
    }
    return this._token
  }

  setToken ( token?: string ) {
    this._token = token
    if ( token ) {
      localStorage.setItem('token', token)
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
async function fetchAnonymousToken (): Promise<string> {
  const GET_ANONYMOUS_TOKEN = '/auth/anonymous'
  return await axios.get(GET_ANONYMOUS_TOKEN, {
    baseURL: baseURL,
  })
  .then( response => response.data )
}

// multiple imports share one instance
export default new TokenManager( )
