import http from './http'

export const API_URL = '/customers'

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

export async function updateCustomerInfo(customerInfoRequest) {
  return await putRequest('updateCustomerInfo', customerInfoRequest)
}

export async function addAddress(addressRequest) {
  return await putRequest('AddAddress', addressRequest)
}

export async function updateAddress(addressRequest) {
  return await putRequest('UpdateAddress', addressRequest)
}

export async function deleteAddress(deleteAddressRequest) {
  return await putRequest('DeleteAddress', deleteAddressRequest)
}

async function putRequest(actionName, request) {
  let {id, version, ...data} = request
  const path = `${API_URL}/${id}`
  const payload = {
    version,
    actions: [ {
      'action': actionName,
      ...data
    }]
  }
  const response = await http.put(path, payload)
  return response && response.data
}
