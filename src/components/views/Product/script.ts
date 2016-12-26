import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'
import * as productsTypes from 'src/infrastructure/store/products_types'

export default {
  name: 'Product',
  computed: {
    ...mapGetters({
      product: productsTypes.GET_CURRENT_PRODUCT,
      variant: productsTypes.GET_CURRENT_VARIANT
    })
  },

  created (this: Component) {
    this['fetchProduct']()
  },

  methods: {
    ...mapActions({
      fetchProduct: productsTypes.FETCH_CURRENT_PRODUCT,
    }),
  },

  components: {
    Gallery,
    ProductInfo,
    VariantSelector
  }
}
