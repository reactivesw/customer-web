import { Component } from 'vue'

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
