import { Component } from 'vue'
import VueLadda from 'vue-ladda'
import { mapActions, mapGetters } from 'vuex'

import CategoriesMenu from 'src/components/category/CategoriesMenu'
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'

import { ADD_TO_CART } from 'src/infrastructure/store/modules/carts/actions'
import { GET_CATEGORIES } from 'src/infrastructure/store/modules/categories/getters'
import {
  GET_CURRENT_PRODUCT, GET_CURRENT_PRODUCT_TYPE, GET_CURRENT_PRODUCT_VARIANT,
  GET_CURRENT_PRODUCT_VARIANTS
} from 'src/infrastructure/store/modules/products/getters'
import { FETCH_CURRENT_PRODUCT } from 'src/infrastructure/store/modules/products/actions'

import computeVariantsAttributes from './variantsAttributes'
import { AddLineItem } from 'src/infrastructure/api_client/carts'

const noImagePlaceHolder = require('src/assets/images/no_image_placeholder.png')

export default {
  name: 'Product',

  data() {
    return {
      addToCartAlert: null,
      addingToCart: false
    }
  },

  computed: {
    ...mapGetters({
      categories: GET_CATEGORIES,
      product: GET_CURRENT_PRODUCT,
      variant: GET_CURRENT_PRODUCT_VARIANT,
      variants: GET_CURRENT_PRODUCT_VARIANTS,
      productType: GET_CURRENT_PRODUCT_TYPE
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
      const masterVariantImages = this['product'].masterVariant.images

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
      fetchProduct: FETCH_CURRENT_PRODUCT,
      addToCart: ADD_TO_CART
    }),

    async handleAddToCart (this: Component) {
      this['addToCartAlert'] = null
      this['addingToCart'] = true

      const payload: AddLineItem = {
        productId: this['product'].id,
        variantId: this['variant'].id,
        quantity: 1
      }
      try {
        await this['addToCart'](payload)
        this['addToCartAlert'] = this['$t']('product.addToCartSuccess')
      } catch (e) {
        this['addToCartAlert'] = this['$t']('product.addToCartError')
      } finally {
        this['addingToCart'] = false
      }
    },

    handleSelectSku(this: Component, sku) {
      this['$router'].push({ name: 'products', params: { sku } })
    }
  },

  components: {
    CategoriesMenu,
    Gallery,
    ProductInfo,
    VariantSelector,
    VueLadda
  }
}
