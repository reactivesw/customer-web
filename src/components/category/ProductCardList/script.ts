import {mapGetters} from 'vuex'
import ProductCard from 'src/components/category/ProductCardList/ProductCard'
import {GET_CURRENT_CATEGORY_PRODUCTS} from 'src/infrastructure/store/modules/products/getters'

export default {
  name: 'ProductCardList',
  computed: mapGetters({
    products: GET_CURRENT_CATEGORY_PRODUCTS
  }),
  components: {
    ProductCard
  }
}
