import ProductCard from './ProductCard'

export default {
  name: 'ProductCardList',
  components: {
    ProductCard
  },
  // TODO: Replace data with results from server.
  data() {
    return {
      products: {
        name: {
          en: 'Product Name',
          zh: '商品名'
        },
        masterVariant: {
          prices: [
            {
              value: {
                currencyCode: 'EUR',
                centAmount: 4200
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    routeToProduct(product) {
      // TODO: Replace this with route change operations.
      console.log(this.$t(product.name))
    }
  }
}
