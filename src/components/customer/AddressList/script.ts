import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    addresses: Array,
    defaultAddressId: String
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
