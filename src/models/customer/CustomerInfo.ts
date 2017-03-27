import AddressDetail from './AddressDetail'

interface CustomerInfo {
  id: string
  version: string
  createdAt?: string
  lastModifiedAt?: string
  firstName?: string
  lastName?: string
  middleName?: string
  addresses?: AddressDetail[]
  defaultAddressId?: string
  local?: string
}

export default CustomerInfo

