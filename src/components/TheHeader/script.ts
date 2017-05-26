import Vue from 'vue'
import Component from 'vue-class-component'
import { mapActions, mapGetters } from 'vuex'
import LanguageSelector from 'src/components/TheHeader/LanguageSelector'
import { GET_CUSTOMER, GET_IS_LOGGED_IN } from 'src/infrastructure/store/modules/auth/getters'
import { GET_CART } from 'src/infrastructure/store/modules/carts/getters'
import { SHOW_LOGIN } from 'src/infrastructure/store/modules/modal_dialogs/actions'
import { SEARCH_PRODUCT } from 'src/infrastructure/store/modules/products/actions'

@Component({
  components: {
    LanguageSelector
  }
})
export default class TheHeader extends Vue {
  searchKey = ''

  get customer() {
    return this.$store.getters[GET_CUSTOMER]
  }

  get isLoggedIn() {
    return this.$store.getters[GET_IS_LOGGED_IN]
  }

  get cart() {
    return this.$store.getters[GET_CART]
  }

  get username() {
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
    }
  }

  get cartQuantity() {
    if (this['cart'] && this['cart'].lineItems) {
      return this['cart'].lineItems.reduce((quantity, item) => {
        return quantity + item.quantity
      }, 0)
    } else {
      return 0
    }
  }

  showLogin() {
    this.$store.dispatch(SHOW_LOGIN)
  }

  submitSearch() {
    this.$router.push({ name: 'search', params: { searchKey: this.searchKey } })
  }
}
