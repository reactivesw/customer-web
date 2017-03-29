import AddressDetails from './AddressDetails'

interface CustomerInfo {
  id: string
  version: string
  createdAt?: string
  lastModifiedAt?: string
  firstName?: string
  lastName?: string
  middleName?: string
  addresses?: AddressDetails[]
  defaultAddressId?: string
  local?: string
}

export default CustomerInfo

