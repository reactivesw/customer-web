import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    addr: Object
  }
})
export default class AddressCard extends Vue {
}

