import { Component } from 'vue'

export default {
  name: 'Product',

  props: {
    computedAttributes: Object
  },

  methods: {
    checkState (attrValue) {
      return {
        'btn-danger': attrValue.selected,
        'btn-outline-danger': !attrValue.selected && attrValue.available,
        'btn-outline-secondary': !attrValue.available
      }
    },
  }
}
