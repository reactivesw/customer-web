import { Component } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import * as categoriesType from 'src/infrastructure/store/categories_types'
// components
import CategoriesMenu from 'src/components/category/CategoriesMenu'
import Gallery from 'src/components/product/Gallery'
import ProductInfo from 'src/components/product/ProductInfo'
import VariantSelector from 'src/components/product/VariantSelector'
// store method names
import * as productsTypes from 'src/infrastructure/store/products_types'
import { ADD_TO_CART } from 'src/infrastructure/store/modules/carts/actions'
// help funciton
import computeVariantsAttributes from './variantsAttributes'
const noImagePlaceHolder = require( 'src/assets/images/no_image_placeholder.png' )


import AddLineItem = Carts.ActionPayloads.AddLineItem

export default {
  name: 'Product',

  data () {
    return {
      addToCartAlert: null
    }
  },

  computed: {
    ...mapGetters( {
      categories: categoriesType.GET_CATEGORIES,
      product: productsTypes.GET_CURRENT_PRODUCT,
      variant: productsTypes.GET_CURRENT_PRODUCT_VARIANT,
      variants: productsTypes.GET_CURRENT_PRODUCT_VARIANTS,
      productType: productsTypes.GET_CURRENT_PRODUCT_TYPE
    } ),

    // The 'variantsAttributes' is used by VariantSelector.
    // It only depends on 'variants' and 'productType'. It has two parts:
    // 1. attributesValues: has all combination attributes and their values, used to render variant selector
    // 2. skuAttributeMap: an object that has all skus and their combination attributes
    variantsAttributes( this: Component ) {
      return computeVariantsAttributes( this[ 'variants' ], this[ 'productType' ] )
    },

    // also passed to VariantSelector to compute visual states
    currentSku( this: Component ) {
      if ( this[ 'variant' ] ) {
        return this[ 'variant' ].sku
      }
    },

    attributes( this: Component ) {
      if ( !(this[ 'variant' ] && this[ 'productType' ]) ) return

      const attributesMap = {}
      for ( let attr of this[ 'variant' ].attributes ) {
        attributesMap[ attr.name ] = attr.value
      }

      const attributes = this[ 'productType' ].attributes
      .map( ( attr ) => {
        return {
          name: attr.name,
          label: attr.label,
          type: attr.type,
          value: attributesMap[ attr.name ]
        }
      } )

      return attributes
    },

    images( this: Component ) {
      if ( !(this[ 'variant' ] && this[ 'product' ]) ) return

      const thisVariantImages = this[ 'variant' ].images
      const masterVariantImages = this[ 'product' ].masterVariant.images

      let images
      if ( thisVariantImages.length > 0 ) {
        images = thisVariantImages
      } else if ( masterVariantImages.length > 0 ) {
        images = masterVariantImages.length // use master variant images as fallback
      } else {
        images = [ noImagePlaceHolder ] // use no image placeholder as fallback
      }

      // server only response fullsize images...
      return images.map( image => {
        return {
          href: image.url,
          thumbnail: image.url
        }
      } )
    }
  },

  created( this: Component ) {
    this[ 'fetchProduct' ]()
  },

  watch: {
    '$route': function ( this: Component ) {
      this[ 'fetchProduct' ]()
    }
  },

  methods: {
    ...mapActions( {
      fetchProduct: productsTypes.FETCH_CURRENT_PRODUCT,
      addToCart: ADD_TO_CART
    } ),

    handleAddToCart ( this: Component ) {
      this[ 'addToCartAlert' ] = null

      const payload: AddLineItem = {
        productId: this[ 'product' ].id,
        variantId: this[ 'variant' ].id,
        quantity: 1
      }
      this[ 'addToCart' ]( payload )
      .then( () => {
        this[ 'addToCartAlert' ] = this[ '$t' ]( 'product.addToCartSuccess' )
      } )
      .catch( () => {
        this[ 'addToCartAlert' ] = this[ '$t' ]( 'product.addToCartError' )
      } )
    },

    handleSelectSku( this: Component, sku ) {
      this[ '$router' ].push( { name: 'products', params: { sku } } )
    }
  },

  components: {
    CategoriesMenu,
    Gallery,
    ProductInfo,
    VariantSelector
  }
}
