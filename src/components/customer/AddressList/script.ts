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
    }
  }
}
