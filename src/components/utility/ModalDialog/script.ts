import { Component } from 'vue'

/**
 * The dialog component is a presentation component.
 * It has two properties:
 *   "show" to control show/hide.
 *   "title" is the dialog title.
 *
 * It emits one "hide" event when it is closed.
 * In its content, there is a "body" slot for main content
 * and a "footer" slot for control buttons.
 * Only use simple button styles in "footer", don't use extra styles.
 *
 * he actual dom component is a Bootstrap modal dialog.
 */
export default {
  name: 'ModalDialog',

  props: {
    show: Boolean,
    title: String
  },

  methods: {
    updateState(this: Component) {
      if (this['show']) {
        $(this['$refs'].modal)['modal']('show')
      } else {
        $(this['$refs'].modal)['modal']('hide')
      }
    }
  },

  mounted(this: Component) {
    this['updateState']()
    $(this['$refs'].modal).on('hide.bs.modal', e => {
      this['$emit']('hide')
    })
  },

  updated(this: Component) {
    this['updateState']()
  }
}
