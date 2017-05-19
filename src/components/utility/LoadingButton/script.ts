import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    // loading prop to change the status of this component.
    loading: {
      type: Boolean,
      required: true
    }
  }
})
export default class LoadingButton extends Vue {
  handleClick(e) {
    this.$emit('click', e)
  }
}
