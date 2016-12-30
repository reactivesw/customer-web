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
      if (this['product'].masterVariant.images.length === 0) {
        return noImagePlaceHolder
      } else {
        return this['product'].masterVariant.images[0].url
      }
    },

    money(this: Component) {
      if (this['product'].masterVariant.prices.length === 0) {
        return this['$t']('product.no_price')
      } else {
        return MoneyToString(this['product'].masterVariant.prices[0].value)
      }
    }
  },

  methods: {
    MoneyToString
  }
}
