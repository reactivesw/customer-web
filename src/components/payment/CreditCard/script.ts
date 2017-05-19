import Vue from 'vue'
import LoadingButton from 'src/components/utility/LoadingButton'
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
  props: {
    saving: Boolean,
    default: false
  },
  components: {
    LoadingButton
  }
})
export default class CreditCard extends Vue {
  creditCard = createEmpty()

  saving: boolean

  saveFormHandler() {
    this.$emit('addCreditCard', this.creditCard)
  }

  cancelFormHandler() {
    this.$emit('cancelAddCreditCard')
  }
}
