import Vue from 'vue'
import Component from 'vue-class-component'
import { SIGN_OUT } from 'src/infrastructure/store/modules/auth/actions'

@Component({
})
export default class Customer extends Vue  {
  signOut() {
    this.$store.dispatch(SIGN_OUT)
  }
}
