import ApiRequestBase from './ApiRequestBase'
import NewAddressDetails from 'src/models/customer/NewAddressDetails'

interface AddAddressRequest extends ApiRequestBase {
  newAddressDetails: NewAddressDetails
}

export default AddAddressRequest
