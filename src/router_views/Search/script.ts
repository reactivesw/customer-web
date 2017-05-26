import Vue from 'vue'
import Component from 'vue-class-component'
import { SEARCH_PRODUCT } from 'src/infrastructure/store/modules/products/actions'
import { GET_SEARCH_RESULT } from 'src/infrastructure/store/modules/products/getters'
import ProductCardList from 'src/components/category/ProductCardList'

@Component({
  props: ['searchKey'],

  watch: {
    searchKey(newKey) {
      this['$store'].dispatch(SEARCH_PRODUCT, newKey)
    }
  },

  components: {
    ProductCardList
  }
})
export default class Search extends Vue {
  get searchResult() {
    return this.$store.getters[GET_SEARCH_RESULT]
  }

  created() {
    this.$store.dispatch(SEARCH_PRODUCT, this['searchKey'])
  }
}
