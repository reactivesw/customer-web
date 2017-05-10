import Vue from 'vue'
import Component from 'vue-class-component'
import { auth as authApi } from 'src/infrastructure/api_client'

import TheHeader from 'src/components/TheHeader'
import TheFooter from 'src/components/TheFooter'
import Login from 'src/components/TheHeader/Login'
import SignUp from 'src/components/TheHeader/SignUp'

import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { GET_CUSTOMER, GET_IS_LOGGED_IN } from 'src/infrastructure/store/modules/auth/getters'
import { FETCH_CATEGORIES } from 'src/infrastructure/store/modules/categories/actions'
import { SHOW_LOGIN } from 'src/infrastructure/store/modules/modal_dialogs/actions'
import { LOGOUT } from 'src/infrastructure/store/modules/auth/actions'

@Component({
  components: {
    TheHeader,
    TheFooter,
    Login,
    SignUp
  }
})
export default class App extends Vue {

  created() {
    this.fetchCategories()
    this.fetchCart()

    // Make sure logout current user(outdated) and ask for login again if unAuthorized event raised.
    authApi.setUnAuthorizedListener(async err => {
      const isLoggedIn = this['$store'].getters[GET_IS_LOGGED_IN]
      if (isLoggedIn) {
        await this['$store'].dispatch(LOGOUT)
      }
      await this['$store'].dispatch(SHOW_LOGIN)
    })
  }

  // store operations
  get customer() {
    return this.$store.getters[GET_CUSTOMER]
  }

  fetchCategories() {
    this.$store.dispatch(FETCH_CATEGORIES)
  }

  fetchCart() {
    this.$store.dispatch(FETCH_CART)
  }
}
