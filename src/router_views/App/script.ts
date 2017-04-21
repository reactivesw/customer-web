import Vue from 'vue'
import Component from 'vue-class-component'

import TheHeader from 'src/components/TheHeader'
import TheFooter from 'src/components/TheFooter'
import Login from 'src/components/TheHeader/Login'
import SignUp from 'src/components/TheHeader/SignUp'

import { FETCH_CART } from 'src/infrastructure/store/modules/carts/actions'
import { GET_CUSTOMER } from 'src/infrastructure/store/modules/auth/getters'
import { FETCH_CATEGORIES } from 'src/infrastructure/store/modules/categories/actions'

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
