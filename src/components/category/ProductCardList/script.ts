import Vue from 'vue'
import Component from 'vue-class-component'
import ProductCard from 'src/components/category/ProductCardList/ProductCard'

@Component({
  props: ['products'],

  components: {
    ProductCard
  }
})
export default class ProductCardList extends Vue {}
