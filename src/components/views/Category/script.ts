import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProductCardList from 'src/components/category/ProductCardList'
import * as productsType from 'src/infrastructure/store/products_types'

export default {
  name: 'Category',

  computed: mapGetters({
    products: productsType.GET_CURRENT_CATEGORY_PRODUCTS
  }),

  methods: {
    ...mapActions({
      fetchCurrentProducts: productsType.FETCH_CURRENT_CATEGORY_PRODUCTS
    }),
    fetchData (this: Component) {
      try {
        return this['fetchCurrentProducts']()
      } catch (err) {
        console.log(err)
      }
    }
  },

  created (this: Component) {
    this['fetchData']()
  },

  watch: {
    $route (this: Component) {
      this['fetchData']()
    }
  },

  components: {
    ProductCardList
  }
}
