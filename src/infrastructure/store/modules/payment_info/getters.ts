export const GET_PAYMENTS = 'customer_info/GET_PAYMENTS'
export const HAS_SELECTED_PAYMENT = 'customer_info/HAS_SELECTED_PAYMENT'
export const GET_SELECTED_PAYMENT = 'customer_info/GET_SELECTED_PAYMENT'

const getters = {
  [GET_PAYMENTS](state) {
    return state.payments
  },

  [HAS_SELECTED_PAYMENT](state) {
    let result = false
    const payments = state.payments
    if (payments) {
      if (payments.find( payment => payment.selected)) {
        result = true
      }
    }
    return result
  },

  [GET_SELECTED_PAYMENT](state) {
    let result = undefined
    const payments = state.payments
    if (payments) {
      result = payments.find( payment => payment.selected)
    }
    return result
  }
}

export default getters
