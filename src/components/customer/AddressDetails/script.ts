import Vue from 'vue'
import VueLadda from 'src/components/utility/VueLadda'
import Component from 'vue-class-component'

@Component({
  props: {
    addressProp: Object,
    saving: {
      type: Boolean,
      default: false
    }
  },

  components: {
    VueLadda
  }
})
export default class AddressDetails extends Vue {
  addressProp: object // for the above props field

  // use this as a flag to force re-compute and discard input values
  // when a user clicks cancel
  forceRefresh: boolean = false

  // computed
  get addressDetails() {
    return Object.assign({}, this.addressProp, { forceRefresh: this.forceRefresh })
  }

  saveAddressDetails() {
    this.$emit('saveAddressDetails', this.addressDetails)
  }

  cancelAddressDetails() {
    this.forceRefresh = !this.forceRefresh
    this.$emit('cancelAddressDetails')
  }
}

