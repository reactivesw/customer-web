/**
 * use for a new address details that don't have an id
 */

interface NewAddressDetails {
  createdAt?: string
  lastModifiedAt?: string
  fullName?: string
  zip?: string
  phone?: string
  firstLine: string
  secondLine?: string
  country: string
  state?: string
  city: string
}

export default NewAddressDetails
