import { Component } from 'vue'
import 'slick-carousel'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

const fullsizeOptions = {
  asNavFor: '.product-gallery-thumbnails',
  infinite: false,
  arrows: false,
}

const thumbnailOptions = {
  asNavFor: '.product-gallery-fullsizes',
  centerMode: true,  // put selected slide to the middle
  variableWidth: true, // no gap between slides
  infinite: false,  // no cyclic sliding
  focusOnSelect: true,  // allwo click to select
}

function initGallery(vm: Component) {
  const fullsizes = $(vm['$refs'].fullsizes)
  const thumbnails = $(vm['$refs'].thumbnails)

  // setup fullsizes images slider
  // slick-carousel docuemnt url https://github.com/kenwheeler/slick/
  let fullsizesInstance = fullsizes['slick'](fullsizeOptions)

  // setup thumbnails images slider
  let thumbnailsInstance = thumbnails['slick'](thumbnailOptions)
}

export default {
  name: 'Gallery',

  props: {
    slides: Array
  },

  mounted(this: Component) {
    initGallery(this)
  },

  // need to undo existing jQuery initialization when data changes
  beforeUpdate(this: Component) {
    $(this['$refs'].fullsizes)['slick']('unslick')
    $(this['$refs'].thumbnails)['slick']('unslick')
  },

  // need to initialize gallery when data changes
  // jQuery operation happens after Vue rendering
  updated(this: Component) {
    initGallery(this)
  }
}
