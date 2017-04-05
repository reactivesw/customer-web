import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    payment: Object
  }
})
export default class PaymentCard extends Vue {
}
