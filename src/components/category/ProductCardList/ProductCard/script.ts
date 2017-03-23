import { Component } from 'vue'
import { MoneyToString } from 'src/infrastructure/utils'
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
      return MoneyToString(this['product'].price.value)
    }
  },

  methods: {
    MoneyToString
  }
}
