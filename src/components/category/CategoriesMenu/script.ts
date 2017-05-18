import Vue from 'vue'
import Component from 'vue-class-component'
import CategoryNavButton from 'src/components/category/CategoriesMenu/CategoryNavButton'
import { FETCH_CATEGORIES } from 'src/infrastructure/store/modules/categories/actions'

@Component({
  props: {
    categories: Array
  },

  components: {
    CategoryNavButton
  }
})
export default class CategoriesMenu extends Vue {
  created() {
    return this.$store.dispatch(FETCH_CATEGORIES)
  }
}
