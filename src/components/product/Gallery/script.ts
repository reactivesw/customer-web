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

  // to make the jQuery operatoin work, perform three steps
  // 1. initialize in mounted
  // 2. undo initialization in beforeUpdate
  // 3. initialize in updated
  // 2 and 3 happen whenever there is a prop data change
  mounted(this: Component) {
    initGallery(this)
  },

  beforeUpdate(this: Component) {
    $(this['$refs'].fullsizes)['slick']('unslick')
    $(this['$refs'].thumbnails)['slick']('unslick')
  },

  updated(this: Component) {
    initGallery(this)
  }
}
