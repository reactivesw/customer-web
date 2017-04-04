import Vue from 'vue'
import Component from 'vue-class-component'

import { SIGN_OUT } from 'src/infrastructure/store/auth_types'

@Component({
})
export default class Customer extends Vue  {
  signOut() {
    this.$store.dispatch(SIGN_OUT)
  }
}
