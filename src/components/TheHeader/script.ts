import { Component } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import LanguageSelector from 'src/components/TheHeader/LanguageSelector'
import { GET_CUSTOMER, GET_IS_LOGGED_IN } from 'src/infrastructure/store/modules/auth/getters'
import { GET_CART } from 'src/infrastructure/store/modules/carts/getters'
import {SHOW_LOG_IN} from 'src/infrastructure/store/modules/modal_dialogs/actions'

export default {
  name: 'TheHeader',

  computed: {
    ...mapGetters({
      customer: GET_CUSTOMER,
      isLoggedIn: GET_IS_LOGGED_IN,
      cart: GET_CART
    }),

    username(this: Component) {
      if (this['customer']) {
        if (this['customer'].firstName && this['customer'].lastName) {
          return (this['customer'].firstName + this['customer'].lastName)
        } else if (this['customer'].email) {
          return this['customer'].email
        } else if (this['customer'].name) {
          // server don't return name field when sign in, we use it to record name from social login.
          return this['customer'].name
        } else {
          return 'Customer'
        }
        // TODO: google loged in use google name, fb is the same
      }
    },

    cartQuantity ( this: Component ) {
      if ( this['cart'] && this['cart'].lineItems ) {
        return this[ 'cart' ].lineItems.reduce( ( quantity, item ) => {
          return quantity + item.quantity
        }, 0 )
      } else {
        return 0
      }
    }
  },

  methods: {
    ...mapActions({
      showLogin: SHOW_LOG_IN
    })
  },

  components: {
    LanguageSelector
  }
}
