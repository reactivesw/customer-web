import CategoriesMenu from './CategoriesMenu'
import data from './data'

export default {
  name: 'Category',

  data() {
    return {
      categories: data
    }
  },

  components: {
    CategoriesMenu
  }
}