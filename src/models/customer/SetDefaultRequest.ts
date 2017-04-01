import ApiRequestBase from './ApiRequestBase'

interface SetDefaultRequest extends ApiRequestBase {
  addressId: string   // the default address id
}

export default SetDefaultRequest
