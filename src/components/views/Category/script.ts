import { mapGetters, mapActions } from 'vuex'
import CategoriesMenu from 'src/components/category/CategoriesMenu'
import ProductCardList from 'src/components/category/ProductCardList'
import * as categoriesType from 'src/libs/store/categories-types'

export default {
  name: 'Category',

  computed: mapGetters({
    categories: categoriesType.GET_CATEGORIES
  }),

  methods: {
    ...mapActions({
      fetchCategories: categoriesType.FETCH_CATEGORIES
    })
  },

  created () {
    this.fetchCategories()
  },

  components: {
    CategoriesMenu,
    ProductCardList
  }
}
