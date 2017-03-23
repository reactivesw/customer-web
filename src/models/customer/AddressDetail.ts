interface AddressDetail {
  id: string
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

export default AddressDetail
