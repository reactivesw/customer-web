import { Component } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import LanguageSelector from './LanguageSelector'
import { SHOW_SIGN_IN } from 'src/infrastructure/store/modal_dialogs_types'
import { GET_CUSTOMER, GET_IS_LOGGED_IN } from 'src/infrastructure/store/modules/auth/getters'
import { GET_CART } from 'src/infrastructure/store/modules/carts/getters'

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
        } else {
          return this['customer'].email
        }
      }
      return ''
    },

    cartQuantity ( this: Component ) {
      if ( this['cart'] ) {
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
      showSignIn: SHOW_SIGN_IN
    })
  },

  components: {
    LanguageSelector
  }
}
