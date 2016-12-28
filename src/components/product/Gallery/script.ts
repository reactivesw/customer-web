import { Component } from 'vue'
import 'slick-carousel'
import 'slick-carousel/slick/slick.scss'
import 'slick-carousel/slick/slick-theme.scss'

export default {
  name: 'Gallery',

  // TODO: use actual images instead of placeholders
  data () {
    return {
      slides: [
        {
          href: 'http://placehold.it/500/EF9A9A?text=pic1',
          thumbnail: 'http://placehold.it/100/EF9A9A?text=pic1'
        },
        {
          href: 'http://placehold.it/500/F48FB1?text=pic2',
          thumbnail: 'http://placehold.it/100/F48FB1?text=pic2'
        },
        {
          href: 'http://placehold.it/500/CE93D8?text=pic3',
          thumbnail: 'http://placehold.it/100/CE93D8?text=pic3'
        },
        {
          href: 'http://placehold.it/500/B39DDB?text=pic4',
          thumbnail: 'http://placehold.it/100/B39DDB?text=pic4'
        }
      ]
    }
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
      slidesToShow: 3,
      variableWidth: true,
      infinite: false,
      focusOnSelect: true
    })
  }
}
