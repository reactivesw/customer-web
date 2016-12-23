import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import ProductCardList from 'src/components/category/ProductCardList'
import * as productsType from 'src/infrastructure/store/products_types'
import * as categoriesType from 'src/infrastructure/store/categories_types'

export default {
  name: 'Category',

  computed: mapGetters({
    products: productsType.GET_CURRENT_CATEGORY_PRODUCTS,
    featureCategory: categoriesType.GET_FEATURE_CATEGORY
  }),

  methods: {
    ...mapActions({
      fetchCategories: categoriesType.FETCH_CATEGORIES,
      fetchCurrentProducts: productsType.FETCH_CURRENT_CATEGORY_PRODUCTS
    }),

    async fetchData (this: Component) {
      // if catId is undefined then find the featureCategory and redirect to it.
      if (!this['$route'].params.catId) {
        await this['fetchCategories']()
        this['$router'].replace({ name: 'categories', params: { catId: this['featureCategory'].id } })
      }

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
