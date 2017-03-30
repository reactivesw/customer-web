import NewAddressDetails from './NewAddressDetails'

// add a not null id field for all existing AddressDetails
interface AddressDetails extends NewAddressDetails {
  id: string
}

export default AddressDetails
