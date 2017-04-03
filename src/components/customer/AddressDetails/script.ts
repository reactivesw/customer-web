import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    addressProp: Object
  }
})

export default class App extends Vue {
  addressProp: object

  // computed
  get addressDetails() {
    return Object.assign({}, this.addressProp)
  }

  saveAddressDetails() {
    this.$emit('saveAddressDetails', this.addressDetails)
  }

  cancelAddressDetails() {
    this.$emit('cancelAddressDetails')
  }

}

