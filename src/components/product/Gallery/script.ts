import Vue from 'vue'
import Component from 'vue-class-component'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

@Component({
  props: {
    slides: {
      type: Array,
      required: true
    }
  },

  components: {
    swiper,
    swiperSlide
  }
})
export default class Gallery extends Vue {
  currentImg = this['slides'][0].href
  thumbnailOptions = {
    slidesPerView: 'auto',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  }
}
