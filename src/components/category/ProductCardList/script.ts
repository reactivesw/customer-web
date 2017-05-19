import Vue from 'vue'
import Component from 'vue-class-component'
import ProductCard from 'src/components/category/ProductCardList/ProductCard'
import { GET_CURRENT_CATEGORY_PRODUCTS } from 'src/infrastructure/store/modules/products/getters'

@Component({
  components: {
    ProductCard
  }
})
export default class ProductCardList extends Vue {
  get products() {
    return this.$store.getters[GET_CURRENT_CATEGORY_PRODUCTS]
  }
}
