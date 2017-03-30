import ApiRequestBase from './ApiRequestBase'
import AddressDetails from './AddressDetails'

interface UpdateAddressRequest extends ApiRequestBase {
  addressDetails: AddressDetails
}

export default UpdateAddressRequest
