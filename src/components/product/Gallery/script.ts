import { Component } from 'vue'
import 'slick-carousel'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

export default {
  name: 'Gallery',

  props: {
    slides: Array
  },

  mounted (this: Component) {
    const fullsizes = $(this['$refs'].fullsizes)
    const thumbnails = $(this['$refs'].thumbnails)

    // setup fullsizes images slider
    let fullsizesInstance = fullsizes['slick']({
      asNavFor: '.product-gallery-thumbnails',
      slidesToShow: 1,
      fade: true,
      infinite: false,
      arrows: false,

      // turn animation to slide in small screen for better experience
      responsive: [
        {
          breakpoint: 768,
          settings: {
            fade: false
          }
        }
      ]
    })

    // setup thumbnails images slider
    let thumbnailsInstance = thumbnails['slick']({
      asNavFor: '.product-gallery-fullsizes',
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true,
      infinite: false,
      focusOnSelect: true,
      arrows: true
    })
  },

  updated (this: Component) {

  }
}
