import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'

import CategoriesMenu from 'src/components/category/CategoriesMenu'
import ProductCardList from 'src/components/category/ProductCardList'

import {GET_CATEGORIES, GET_FEATURE_CATEGORY} from 'src/infrastructure/store/modules/categories/getters'
import {FETCH_CATEGORIES} from 'src/infrastructure/store/modules/categories/actions'
import {GET_CURRENT_CATEGORY_PRODUCTS} from 'src/infrastructure/store/modules/products/getters'
import {FETCH_CURRENT_CATEGORY_PRODUCTS} from 'src/infrastructure/store/modules/products/actions'

export default {
  name: 'Category',

  computed: mapGetters({
    categories: GET_CATEGORIES,
    products: GET_CURRENT_CATEGORY_PRODUCTS,
    featureCategory: GET_FEATURE_CATEGORY
  }),

  methods: {
    ...mapActions({
      fetchCategories: FETCH_CATEGORIES,
      fetchCurrentProducts: FETCH_CURRENT_CATEGORY_PRODUCTS
    }),

    async fetchData (this: Component) {
      // if catSlug is undefined then find the featureCategory and redirect to it.
      if (!this['$route'].params.catSlug) {
        await this['fetchCategories']()
        this['$router'].replace({ name: 'categories', params: { catSlug: this['featureCategory'].slug } })
      } else {
        this['fetchCurrentProducts']()
      }
    }
  },

  created (this: Component) {
    this['fetchData']()
  },

  // when route changes, fetch new category data
  watch: {
    $route (this: Component) {
      this['fetchData']()
    }
  },

  components: {
    CategoriesMenu,
    ProductCardList
  }
}
