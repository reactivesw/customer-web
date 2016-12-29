import * as _ from 'lodash'
import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'
import * as productsTypes from 'src/infrastructure/store/products_types'
import computeAttributes from './computeAttributes'

export default {
  name: 'Product',
  computed: {
    ...mapGetters({
      product: productsTypes.GET_CURRENT_PRODUCT,
      variant: productsTypes.GET_CURRENT_PRODUCT_VARIANT,
      variants: productsTypes.GET_CURRENT_PRODUCT_VARIANTS,
      productType: productsTypes.GET_CURRENT_PRODUCT_TYPE
    }),

    valuesAndSku(this: Component) {
      return computeAttributes(this['variants'], this['productType'])
    },

    computedAttributes(this: Component) {
      const valuesAndSku = this['valuesAndSku']
      if (valuesAndSku) {
        return _.assign({},
          valuesAndSku,
          { selectedSku: this['variant'].sku }
        )
      }
    }
  },

  created(this: Component) {
    this['fetchProduct']()
  },

  methods: {
    ...mapActions({
      fetchProduct: productsTypes.FETCH_CURRENT_PRODUCT,
    }),

    handleSelectSku(data) {
      console.log(data)
    }
  },

  components: {
    Gallery,
    ProductInfo,
    VariantSelector
  }
}
