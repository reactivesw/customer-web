import ApiRequestBase from './ApiRequestBase'
import AddressDetails from 'src/models/customer/AddressDetails'

interface UpdateAddressRequest extends ApiRequestBase {
  addressDetails: AddressDetails
}

export default UpdateAddressRequest
