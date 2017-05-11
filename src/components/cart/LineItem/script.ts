import { Component } from 'vue'
import { SetLineItemQuantity } from 'src/infrastructure/api_client/carts'

const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

export default {
  name: 'LineItem',

  props: {
    lineItem: Object
  },

  data() {
    return {
      quantityInputDisabled: false, // control input disabled status
      resetQuantityHandle: null // handle of reset quantity setTimeout callback
    }
  },

  computed: {
    price(this: Component) {
      return this['$moneyToString'](this['lineItem'].price)
    },
    image(this: Component) {
      const images = this['lineItem'].images
      if (images && images.length > 0) {
        return images[0].url
      } else {
        return noImagePlaceHolder
      }
    }
  },

  methods: {
    handleChangeQuantity(this: Component, event) {
      const MAX_LIMIT = 99

      const input = event.target
      let newQuantity = input.valueAsNumber

      if (newQuantity > 0 && newQuantity <= MAX_LIMIT) { // only emit event if the new quantity is legal
        const payload: SetLineItemQuantity = {
          lineItemId: this['lineItem'].id,
          quantity: newQuantity
        }
        this['$emit']('changeQuantity', payload)

        /**
         * Disable the input for a while(the same duration as http timeout)
         * keep the settimeout handle to clear it if lineitem updated successfully.
         */
        this['quantityInputDisabled'] = true
        this['resetQuantityHandle'] = setTimeout(() => {
          // still not updated
          this['quantityInputDisabled'] = false
        }, process.env.HTTP_TIMEOUT)
      } else if (newQuantity === NaN || newQuantity <= 0) { // to remove, need to click the remove button
        input.value = 1
      } else if (newQuantity > MAX_LIMIT) {
        input.value = MAX_LIMIT
      }
    }
  },

  watch: {
    lineItem(this: Component) {
      clearTimeout(this['resetQuantityHandle'])
      this['quantityInputDisabled'] = false
    }
  }
}
