import { Component } from 'vue'

import AddressDetails from '../AddressDetails'
import ModalDialog from 'src/components/utility/ModalDialog'

export default {
  name: 'AddressDialog',

  // use computed to track the property change
  computed: {
    addressDetails(this: Component) {
      return Object.assign({}, this['addressProp'])
    }
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    addressProp: Object
  },

  methods: {
    saveAddressDetails(this: Component, addressDetails) {
      this['$emit']('saveAddressDetails', addressDetails)
    },
    cancelAddressDetails(this: Component) {
      this['$emit']('cancelAddressDetails')
    }
  },

  components: {
    AddressDetails,
    ModalDialog
  }
}
