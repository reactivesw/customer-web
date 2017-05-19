import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    product: Object,
    variant: Object
  }
})
export default class Product extends Vue {
  get name() {
    return this['product'].name
  }

  get price() {
    return this['variant'].prices[0].value
  }

  get description() {
    return this['product'].description
  }
}
