import { Component } from 'vue'

import ModalDialog from 'src/components/utility/ModalDialog'

export default {
  name: 'ConfirmDialog',

  props: {
    show: Boolean,
    message: String
  },

  methods: {
    confirmYes(this: Component) {
      this['$emit']('confirmYes')
    },

    confirmNo(this: Component) {
      this['$emit']('confirmNo')
    }
  },

  components: {
    ModalDialog
  }
}
