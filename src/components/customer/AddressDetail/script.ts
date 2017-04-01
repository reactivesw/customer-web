import { Component } from 'vue'

import ModalDialog from 'src/components/utility/ModalDialog'

export default {
  name: 'AddressDetails',

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
    submitForm(this: Component) {
      this['$emit']('saveAddressDetails', this['addressDetails'])
    },
    cancelForm(this: Component) {
      this['$emit']('cancelAddressDetails')
    }
  },

  components: {
    ModalDialog
  }
}
