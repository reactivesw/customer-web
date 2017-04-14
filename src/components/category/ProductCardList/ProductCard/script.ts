import { Component } from 'vue'
const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },

  computed: {
    imageUrl(this: Component) {
      if (!this['product'].imageUrl) {
        return noImagePlaceHolder
      } else {
        return this['product'].imageUrl
      }
    },

    money(this: Component) {
      return this['$moneyToString'](this['product'].price.value)
    }
  }
}
