import Vue from 'vue'
import Component from 'vue-class-component'

import AddressCard from 'src/components/customer/AddressCard'

@Component({
  props: {
    addresses: Array,
    defaultAddressId: String
  },

  components: {
    AddressCard
  }
})
export default class AddressList extends Vue {
  changeDefault(addrId) {
    this.$emit('defaultChanged', addrId)
  }

  updateAddress(addr) {
    this.$emit('updateAddress', addr)
  }

  deleteAddress(addrId) {
    this.$emit('deleteAddress', addrId)
  }
}
