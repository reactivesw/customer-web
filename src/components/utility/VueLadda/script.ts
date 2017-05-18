import Vue from 'vue'
import Component from 'vue-class-component'
import Ladda from 'ladda'

@Component({
  props: {
    // use vue props validation to make sure "data-style" is given. (ladda need it)
    dataStyle: {
      type: String,
      default: 'expand-left'
    },
    // loading prop to change the status of this component.
    loading: {
      type: Boolean,
      required: true
    },
    progress: {
      validator(progress) {
        return progress >= 0 && progress <= 1
      },
      default: 0
    }
  },

  watch: {
    loading(loading) {
      loading ? this['ladda'].start() : this['ladda'].stop();
    },

    progress(progress) {
      this['ladda'].setProgress(progress)
    }
  }
})
export default class VueLadda extends Vue {
  ladda: any
  loading

  mounted() {
    this.ladda = Ladda.create(this.$refs.ladda)
    this.loading ? this.ladda.start() : this.ladda.stop()
  }

  beforeDestroy() {
    this.ladda.remove()
  }

  handleClick(e) {
    this.$emit('click', e)
  }
}
