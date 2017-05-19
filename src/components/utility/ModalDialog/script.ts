import Vue from 'vue'
import Component from 'vue-class-component'

/**
 * The dialog component is a presentation component.
 * It has two properties:
 *   "show" to control show/hide.
 *   "title" is the dialog title.
 *
 * It emits one "hide" event when it is closed.
 * The parent may want to catch this to cancel operation.
 *
 * In its content, there is a "body" slot for main content
 * and a "footer" slot for control buttons.
 * Only use simple button styles in "footer", don't use extra styles.
 *
 * The actual dom component is a Bootstrap modal dialog.
 */
@Component({
  props: {
    show: Boolean,
    title: String
  },
})
export default class ModalDialog extends Vue {
  updateState() {
    if (this['show']) {
      $(this.$refs.modal)['modal']('show')
    } else {
      $(this.$refs.modal)['modal']('hide')
    }
  }

  mounted() {
    this.updateState()
    $(this.$refs.modal).on('hide.bs.modal', e => {
      this.$emit('hide')
    })
  }

  updated() {
    this.updateState()
  }
}
