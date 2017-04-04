import Vue from 'vue'
import Component from 'vue-class-component'

import TheHeader from 'src/components/TheHeader'
import TheFooter from 'src/components/TheFooter'
import SignIn from 'src/components/TheHeader/SignIn'
import SignUp from 'src/components/TheHeader/SignUp'

import { FETCH_CATEGORIES }
  from 'src/infrastructure/store/categories_types'

import { FETCH_CART }
  from 'src/infrastructure/store/modules/carts/actions'

import { GET_CUSTOMER } from 'src/infrastructure/store/auth_types'

@Component({
  components: {
    TheHeader,
    TheFooter,
    SignIn,
    SignUp
  }
})
export default class App extends Vue  {

  created() {
    this.fetchCategories()
    this.fetchCart()
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
