import Vue from 'vue'
import Component from 'vue-class-component'

import CategoriesMenu from 'src/components/category/CategoriesMenu'
import ProductCardList from 'src/components/category/ProductCardList'

import { GET_CATEGORIES, GET_FEATURE_CATEGORY } from 'src/infrastructure/store/modules/categories/getters'
import { FETCH_CATEGORIES } from 'src/infrastructure/store/modules/categories/actions'
import { GET_CURRENT_CATEGORY_PRODUCTS } from 'src/infrastructure/store/modules/products/getters'
import { FETCH_CURRENT_CATEGORY_PRODUCTS } from 'src/infrastructure/store/modules/products/actions'

@Component({
  watch: {
    $route() {
      this['fetchData']()
    }
  },

  components: {
    CategoriesMenu,
    ProductCardList
  }
})
export default class Category extends Vue {

  created() {
    this.fetchData()
  }

  // Getters
  get categories() {
    return this.$store.getters[GET_CATEGORIES]
  }

  get products() {
    return this.$store.getters[GET_CURRENT_CATEGORY_PRODUCTS]
  }

  get featureCategory() {
    return this.$store.getters[GET_FEATURE_CATEGORY]
  }

  async fetchData() {
    // if catSlug is undefined then find the featureCategory and redirect to it.
    if (!this['$route'].params.catSlug) {
      await this.$store.dispatch(FETCH_CATEGORIES)
      if (this.featureCategory) {
        this.$router.replace({ name: 'categories', params: { catSlug: this.featureCategory.slug } })
      }
    } else {
      this.$store.dispatch(FETCH_CURRENT_CATEGORY_PRODUCTS)
    }
  }
}
