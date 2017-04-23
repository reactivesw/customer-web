import Vue from 'vue'
import Component from 'vue-class-component'

const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

@Component({
  props: {
    lineItem: Object
  }
})
export default class LineItem extends Vue {
  lineItem

  get price() {
    return this['$moneyToString'](this.lineItem.price)
  }

  get image() {
    const images = this.lineItem.images
    if (images && images.length > 0) {
      return images[0].url
    } else {
      return noImagePlaceHolder
    }
  }
}
