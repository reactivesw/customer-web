import Vue from 'vue'
import Component from 'vue-class-component'
import { LOGOUT } from 'src/infrastructure/store/modules/auth/actions'

@Component({})
export default class Customer extends Vue {
  logout() {
    this.$store.dispatch(LOGOUT)
  }
}
