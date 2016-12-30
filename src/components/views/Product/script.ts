import * as _ from 'lodash'
import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'

// components
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'

// store method names
import * as productsTypes from 'src/infrastructure/store/products_types'

// help funciton
import computeVariantsAttributes from './variantsAttributes'

export default {
  name: 'Product',
  computed: {
    ...mapGetters({
      product: productsTypes.GET_CURRENT_PRODUCT,
      variant: productsTypes.GET_CURRENT_PRODUCT_VARIANT,
      variants: productsTypes.GET_CURRENT_PRODUCT_VARIANTS,
      productType: productsTypes.GET_CURRENT_PRODUCT_TYPE
    }),

    // The 'variantsAttributes' is used by VariantSelector.
    // It only depends on 'variants' and 'productType'. It has two parts:
    // 1. attributesValues: has all combination attributees and their values, used to render variant selector
    // 2. skuAttributeMap: an object that has all skus and their combination attributes
    variantsAttributes(this: Component) {
      return computeVariantsAttributes(this['variants'], this['productType'])
    },

    // also passed to VariantSelector to compute visual states
    currentSku(this: Component) {
      return this['variant'].sku
    }
  },

  created(this: Component) {
    this['fetchProduct']()
  },

  methods: {
    ...mapActions({
      fetchProduct: productsTypes.FETCH_CURRENT_PRODUCT,
    }),

    handleSelectSku(this: Component, sku) {
      this['$router'].push({ name: 'products', params: { productSlug: this['$route'].params.productSlug, sku } })
    }
  },

  components: {
    Gallery,
    ProductInfo,
    VariantSelector
  }
}
