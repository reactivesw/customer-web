import Vue from 'vue'
import Component from 'vue-class-component'

function createEmpty() {
  return {
    cardholderName: '',
    number: '',
    cvv: '',
    expirationMonth: '',
    expirationYear: ''
  }
}

@Component({
})
export default class CreditCard extends Vue {
  creditCard = createEmpty()

  saveFormHandler() {
    this.$emit('addCreditCard', this.creditCard)
  }

  cancelFormHandler() {
    this.$emit('cancelAddCreditCard')
  }
}
