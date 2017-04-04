import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import TheHeader from 'src/components/TheHeader'
import TheFooter from 'src/components/TheFooter'
import SignIn from 'src/components/TheHeader/SignIn'
import SignUp from 'src/components/TheHeader/SignUp'
import * as categoriesType from 'src/infrastructure/store/categories_types'
import { FETCH_CART }
  from 'src/infrastructure/store/modules/carts/actions'
import * as authType from 'src/infrastructure/store/auth_types'

export default {
  name: 'app',

  computed: {
    ...mapGetters({
      customer: authType.GET_CUSTOMER
    })
  },

  methods: {
    ...mapActions({
      fetchCategories: categoriesType.FETCH_CATEGORIES,
      fetchCart: FETCH_CART
    })
  },

  created(this: Component) {
    this['fetchCategories']()
    this['fetchCart']()
  },

  components: {
    TheHeader,
    TheFooter,
    SignIn,
    SignUp
  }
}
