import Vue from 'vue'
import Component from 'vue-class-component'

import AddressDetails from 'src/components/customer/AddressDetails'
import ModalDialog from 'src/components/utility/ModalDialog'

@Component({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    addressProp: Object
  },

  components: {
    AddressDetails,
    ModalDialog
  }
})
export default class AddressDialog extends Vue {
  saveAddressDetails(addressDetails) {
    this.$emit('saveAddressDetails', addressDetails)
  }

  cancelAddressDetails() {
    this.$emit('cancelAddressDetails')
  }
}
