import { Component } from 'vue'

export default {
  name: 'AddressList',

  props: {
    addresses: Array,
    defaultAddressId: String
  },
  methods: {
    buildAddressStr(addr) {
      return [
        addr.firstLine, addr.secondLine,
        addr.city, addr.state,
        addr.zip, addr.country]
        .join(',')
    },

    changeDefault(this: Component, addrId) {
      this['$emit']('defaultChanged', addrId)
    },

    updateAddress(this: Component, addrId) {
      this['$emit']('updateAddress', addrId)
    }
  }
}
