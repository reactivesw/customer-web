import { Component } from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Gallery',

  props: {
    slides: {
      type: Array,
      required: true
    }
  },

  data(this: Component) {
    return {
      currentImg: this['slides'][0].href, // current selected image

      // options documentation: http://idangero.us/swiper/api/
      thumbnailOptions: {
        slidesPerView: 'auto',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      }
    }
  },

  components: {
    swiper,
    swiperSlide
  }
}
