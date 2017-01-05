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
      return MoneyToString(this['lineItem'].price)
    }
  }
}
