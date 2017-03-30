import AddressDetails from './AddressDetails'

interface CustomerInfo {
  id: string
  version: string
  customerName?: string
  createdAt?: Date
  lastModifiedAt?: Date
  firstName?: string
  lastName?: string
  middleName?: string
  addresses?: AddressDetails[]
  defaultAddressId?: string
}

export default CustomerInfo

