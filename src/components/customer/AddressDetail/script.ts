import { Component } from 'vue'

import ModalDialog from 'src/components/utility/ModalDialog'

export default {
  name: 'AddressDetail',

  data(this: Component) {
    return {
      addressDetails: Object.assign({}, this['addressProp'])
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
