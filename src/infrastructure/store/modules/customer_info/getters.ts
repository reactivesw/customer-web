export const GET_CUSTOMER_INFO = 'customer_info/GET_CUSTOMER_INFO'
export const HAS_DEFAULT_ADDRESS = 'customer_info/HAS_DEFAULT_ADDRESS'
export const GET_DEFAULT_ADDRESS = 'customer_info/GET_DEFAULT_ADDRESS'
const getters = {
  [GET_CUSTOMER_INFO](state) {
    return state.customerInfo
  },

  [HAS_DEFAULT_ADDRESS](state) {
    let result = false
    const customerInfo = state.customerInfo
    if (customerInfo) {
      // a bug in server
      const addresses = customerInfo.addresses
      const hasAddress = !!(addresses && addresses.length)
      result = !!(customerInfo.defaultAddressId && hasAddress)
    }
    return result
  },

  [GET_DEFAULT_ADDRESS](state) {
    let result = undefined
    const info = state.customerInfo
    if (info && info.defaultAddressId && info.addresses) {
      result = info.addresses.find(addr => addr.id === info.defaultAddressId)
    }
    return result
  }
}

export default getters
