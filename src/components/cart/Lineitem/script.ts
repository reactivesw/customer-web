import { Component } from 'vue'
import { MoneyToString } from 'src/infrastructure/utils'

const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

export default {
  name: 'LineItem',

  props: {
    lineItem: Object
  },

  computed: {
    price(this: Component) {
      return MoneyToString(this['lineItem'].price.value)
    },
    image(this: Component) {
      const images = this['lineItem'].productVariant.images
      if (images && images.length > 0) {
        return images[0].url
      } else {
        return noImagePlaceHolder
      }
    }
  },

  methods: {
    handleChangeQuantity(this: Component, event) {
      const MAX_LIMIT = 99

      const input = event.target
      let newQuantity = event.target.valueAsNumber

      if (newQuantity > 0 && newQuantity <= MAX_LIMIT) { // only emit event if the new quantity is legal
        this['$emit']('changeQuantity', { lineItemId: this['lineItem'].id, quantity: newQuantity })
      } else if (newQuantity === NaN || newQuantity <= 0) { // to remove, need to click the remove button
        input.value = 1
      } else if (newQuantity > MAX_LIMIT) {
        input.value = MAX_LIMIT
      }
    }
  }
}
