import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Gallery from 'src/components/product/Gallery'
import * as productsTypes from 'src/infrastructure/store/products_types'

export default {
  name: 'Product',
  computed: {
    ...mapGetters({
      product: productsTypes.GET_CURRENT_PRODUCT
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
    Gallery
  }
}
