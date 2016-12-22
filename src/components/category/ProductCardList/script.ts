import { mapGetters } from 'vuex'
import * as productsType from 'src/infrastructure/store/products_types'
import ProductCard from './ProductCard'

export default {
  name: 'ProductCardList',
  computed: mapGetters({
    products: productsType.GET_CURRENT_CATEGORY_PRODUCTS
  }),
  components: {
    ProductCard
  }
}
