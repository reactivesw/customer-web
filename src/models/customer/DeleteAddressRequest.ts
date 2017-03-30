import ApiRequestBase from './ApiRequestBase'

interface DeleteAddressRequest extends ApiRequestBase {
  id: string   // the address id
}

export default DeleteAddressRequest