import * as _ from 'lodash'
import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

// components
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'

// store method names
import * as productsTypes from 'src/infrastructure/store/products_types'
import * as cartsTypes from 'src/infrastructure/store/carts_types'

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
    // 1. attributesValues: has all combination attributes and their values, used to render variant selector
    // 2. skuAttributeMap: an object that has all skus and their combination attributes
    variantsAttributes(this: Component) {
      return computeVariantsAttributes(this['variants'], this['productType'])
    },

    // also passed to VariantSelector to compute visual states
    currentSku(this: Component) {
      if (this['variant']) {
        return this['variant'].sku
      }
    },

    attributes(this: Component) {
      if (!(this['variant'] && this['productType'])) return

      const attributesMap = {}
      for (let attr of this['variant'].attributes) {
        attributesMap[attr.name] = attr.value
      }

      const attributes = this['productType'].attributes
      .map((attr) => {
        return {
          name: attr.name,
          label: attr.label,
          type: attr.type,
          value: attributesMap[attr.name]
        }
      })

      return attributes
    },

    images(this: Component) {
      if (!(this['variant'] && this['product'])) return

      const thisVariantImages = this['variant'].images
      const masterVariantImages = this['product'].masterData.current.masterVariant.images

      let images
      if (thisVariantImages.length > 0) {
        images = thisVariantImages
      } else if (masterVariantImages.length > 0) {
        images = masterVariantImages.length // use master variant images as fallback
      } else {
        images = [noImagePlaceHolder] // use no image placeholder as fallback
      }

      // server only response fullsize images...
      return images.map(image => {
        return {
          href: image.url,
          thumbnail: image.url
        }
      })
    }
  },

  created(this: Component) {
    this['fetchProduct']()
  },

  watch: {
    '$route': function (this: Component) {
      this['fetchProduct']()
    }
  },

  methods: {
    ...mapActions({
      fetchProduct: productsTypes.FETCH_CURRENT_PRODUCT,
      addToCart: cartsTypes.ADD_TO_CART
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
