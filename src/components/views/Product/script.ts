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

    // the data passed to VariantSelector. It has three parts:
    // 1. attributesValues: has all combination attributees and their values, used to render variant selector
    // 2. skuAttributeMap: an object that has all skus and their combination attributes 
    // 3. selectedSku: the currently selected sku 
    computedAttributes: function(this: Component) {
      const valuesAndSku = computeAttributes(this['variants'], this['productType'])
      return  {
        ...valuesAndSku,
        selectedSku: this['variant'].sku
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
