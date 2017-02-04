import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import TheHeader from 'src/components/frame/TheHeader'
import TheFooter from 'src/components/frame/TheFooter'
import CategoriesMenu from 'src/components/category/CategoriesMenu'
import SignIn from 'src/components/SignIn'
import SignUp from 'src/components/SignUp'
import * as categoriesType from 'src/infrastructure/store/categories_types'
import * as cartType from 'src/infrastructure/store/carts_types'
import * as authType from 'src/infrastructure/store/auth_types'

export default {
  name: 'app',

  computed: {
    ...mapGetters({
      categories: categoriesType.GET_CATEGORIES,
      customer: authType.GET_CUSTOMER
    })
  },

  methods: {
    ...mapActions({
      fetchCategories: categoriesType.FETCH_CATEGORIES,
      fetchCart: cartType.FETCH_CART
    })
  },

  created(this: Component) {
    this['fetchCategories']()
    this['fetchCart']()
  },

  components: {
    TheHeader,
    TheFooter,
    CategoriesMenu,
    SignIn,
    SignUp
  }
}
