import Vue from 'vue'
import Component from 'vue-class-component'

const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

@Component({
  props: {
    product: Object
  }
})
export default class ProductCard extends Vue {
  get imageUrl() {
    if (!this['product'].imageUrl) {
      return noImagePlaceHolder
    } else {
      return this['product'].imageUrl
    }
  }

  get money() {
    return this['$moneyToString'](this['product'].price.value)
  }
}
