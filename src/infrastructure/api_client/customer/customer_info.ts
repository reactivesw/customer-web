import http from '../http'

import UpdateCustomerInfoRequest from 'src/models/customer/UpdateCustomerInfoRequest'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'
import AddAddressRequest from 'src/models/customer/AddAddressRequest'
import UpdateAddressRequest from 'src/models/customer/UpdateAddressRequest'
import DeleteAddressRequest from 'src/models/customer/DeleteAddressRequest'

export const API_URL = '/customers'

interface RequestHeader {
  customer_id: string
  version: string
  action: string
}

/**
 * fetch all categories
 *
 * @export
 * @returns
 */
export async function getCustomerInfo(id: string) {
  const path = `${API_URL}/${id}`
  const response = await http.get(path)
  return response && response.data
}

export async function updateCustomerInfo(request: UpdateCustomerInfoRequest) {
  let { customer_id, version, customerInfoData } = request
  let header: RequestHeader = { customer_id, version, action: 'updateCustomerInfo' }
  return await putRequest(header, customerInfoData)
}

export async function setDefaultAddress(request: SetDefaultRequest) {
  let { customer_id, version, addressId } = request
  let header: RequestHeader = { customer_id, version, action: 'setDefaultAddress' }
  return await putRequest(header, { addressId })
}

export async function addAddress(request: AddAddressRequest) {
  let { customer_id, version, newAddressDetails } = request
  let header: RequestHeader = { customer_id, version, action: 'addAddress' }
  return await putRequest(header, newAddressDetails)
}

export async function updateAddress(request: UpdateAddressRequest) {
  let { customer_id, version, addressDetails } = request
  let header: RequestHeader = { customer_id, version, action: 'updateAddress' }
  return await putRequest(header, addressDetails)
}

export async function deleteAddress(request: DeleteAddressRequest) {
  let { customer_id, version, id } = request
  let header: RequestHeader = { customer_id, version, action: 'deleteAddress' }
  return await putRequest(header, { id })
}

async function putRequest(header: RequestHeader, fields: object) {
  const path = `${API_URL}/${header.customer_id}`
  const payload = {
    version: header.version,
    actions: [{
      'action': header.action,
      ...fields
    }]
  }
  const response = await http.put(path, payload)
  return response && response.data
}
