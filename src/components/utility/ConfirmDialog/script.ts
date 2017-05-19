import Vue from 'vue'
import Component from 'vue-class-component'

import ModalDialog from 'src/components/utility/ModalDialog'

@Component({
  props: {
    show: Boolean,
    message: String
  },
  components: {
    ModalDialog
  }
})
export default class ConfirmDialog extends Vue {
  confirmYes() {
    this.$emit('confirmYes')
  }

  confirmNo() {
    this.$emit('confirmNo')
  }
}
