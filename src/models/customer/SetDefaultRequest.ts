import ApiBase from './ApiBase'

interface SetDefaultRequest extends ApiBase {
  addressId: string   // the default address id
}

export default SetDefaultRequest
