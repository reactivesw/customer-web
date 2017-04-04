import http from '../http'

export const API_URL = '/credit-cards'

export async function getPayments(customerId) {
  const path = `${API_URL}?customerId=${customerId}`
  const response = await http.get(path)
  return response && response.data
}
