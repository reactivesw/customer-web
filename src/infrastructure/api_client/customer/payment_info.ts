import http from '../http'
import { CreditCardDraft, DefaultCardRequest, DeleteCardRequest }
  from './payment_models'

export const API_URL = '/payments/credit-cards'

export async function getPayments(customerId) {
  const path = `${API_URL}?customerId=${customerId}`
  const response = await http.get(path)
  return response && response.data
}

export async function addCreditCard(request: CreditCardDraft) {
  const response = await http.post(API_URL, request)
  return response && response.data
}

export async function setSelected(request: DefaultCardRequest) {
  const response = await http.put(API_URL, request)
  return response && response.data
}

export async function deleteCreditCard(request: DeleteCardRequest) {
  const path = `${API_URL}/${request.creditCardId}?version=${request.version}`
  const response = await http.delete(path)
  return response && response.data
}
