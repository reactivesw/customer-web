import Vue from 'vue'
import Component from 'vue-class-component'
import { mapActions, mapGetters } from 'vuex'

import CategoriesMenu from 'src/components/category/CategoriesMenu'
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'
import LoadingButton from 'src/components/utility/LoadingButton'

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

@Component({
  watch: {
    '$route': function () {
      this['fetchProduct']()
    }
  },

  components: {
    CategoriesMenu,
    Gallery,
    ProductInfo,
    VariantSelector,
    LoadingButton
  }
})
export default class Product extends Vue {
  addToCartAlert = null
  addingToCart = false

  get categories() {
    return this.$store.getters[GET_CATEGORIES]
  }

  get product() {
    return this.$store.getters[GET_CURRENT_PRODUCT]
  }

  get variant() {
    return this.$store.getters[GET_CURRENT_PRODUCT_VARIANT]
  }

  get variants() {
    return this.$store.getters[GET_CURRENT_PRODUCT_VARIANTS]
  }

  get productType() {
    return this.$store.getters[GET_CURRENT_PRODUCT_TYPE]
  }

  get variantsAttributes() {
    return computeVariantsAttributes(this['variants'], this['productType'])
  }

  get currentSku() {
    if (this.variant) {
      return this.variant.sku
    }
  }

  get attributes() {
    if (!(this.variant && this.productType)) return

    const attributesMap = {}
    for (let attr of this.variant.attributes) {
      attributesMap[attr.name] = attr.value
    }

    const attributes = this.productType.attributes
    .map((attr) => {
      return {
        name: attr.name,
        label: attr.label,
        type: attr.type,
        value: attributesMap[attr.name]
      }
    })

    return attributes
  }

  get images() {
    if (!(this.variant && this.product)) return

    const thisVariantImages = this.variant.images
    const masterVariantImages = this.product.masterVariant.images

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

  created() {
    this.fetchProduct()
  }

  async fetchProduct() {
    return await this.$store.dispatch(FETCH_CURRENT_PRODUCT)
  }

  async addToCart(payload) {
    return await this.$store.dispatch(ADD_TO_CART, payload)
  }

  async handleAddToCart() {
    this.addToCartAlert = null
    this.addingToCart = true

    const payload: AddLineItem = {
      productId: this['product'].id,
      variantId: this['variant'].id,
      quantity: 1
    }
    try {
      await this.addToCart(payload)
      this.addToCartAlert = this['$t']('product.addToCartSuccess')
    } catch (e) {
      this.addToCartAlert = this['$t']('product.addToCartError')
    } finally {
      this.addingToCart = false
    }
  }

  handleSelectSku(sku) {
    this.$router.push({ name: 'products', params: { sku } })
  }
}
