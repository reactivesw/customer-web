import Vue from 'vue'
import Component from 'vue-class-component'
import VueLadda from 'src/components/utility/VueLadda'
import ModalDialog from 'src/components/utility/ModalDialog'
import { INVALID_EMAIL, PASSWORD_NOT_VALID, USER_EXIST } from 'src/infrastructure/api_client/auth'
import { SIGN_UP } from 'src/infrastructure/store/modules/auth/actions'
import { HIDE_SIGN_UP, SHOW_LOGIN } from 'src/infrastructure/store/modules/modal_dialogs/actions'

@Component({
  components: {
    ModalDialog,
    VueLadda
  }
})
export default class SignUp extends Vue {
  email = ''
  pwd = ''
  repeatPwd = ''
  usernameFeedback = null
  passwordFeedback = null
  signUpLoading = false

  get showSignUp() {
    return this.$store.state.modal_dialogs.showSignUp
  }

  hideSignUp() {
    return this.$store.dispatch(HIDE_SIGN_UP)
  }

  showLogin() {
    return this.$store.dispatch(SHOW_LOGIN)
  }

  signUp(payload) {
    return this.$store.dispatch(SIGN_UP, payload)
  }

  checkFormValidity() {
    this.$refs.rpwd['setCustomValidity']('')
    if (this.pwd !== this['repeatPwd']) {
      this.$refs.rpwd['setCustomValidity'](this['$t']('alert.confirm_password_not_match'))
    }

    // Validate required fields, email format and other predefined rules
    this.$refs.signUpForm['checkValidity']()
  }

  async submitSignUp() {
    // clean error messages
    this.usernameFeedback = null
    this.passwordFeedback = null
    this.signUpLoading = true

    try {
      // it has already passed all validation when enter this function
      await this.signUp({ email: this.email, password: this.pwd })
    } catch (e) {
      switch (e.message) {
        case INVALID_EMAIL:
          this.usernameFeedback = this['$t']('alert.invalid_email')
          break

        case USER_EXIST:
          this.usernameFeedback = this['$t']('alert.user_exist')
          break

        case PASSWORD_NOT_VALID:
          this.passwordFeedback = this['$t']('alert.password_not_valid')
          break

        default:
          // password feedback message is on the bottom of the dialog, so show unknow error there is better.
          this.passwordFeedback = this['$t']('alert.unknow_error')
          throw e
      }
    } finally {
      this.signUpLoading = false
    }
  }

  goLogin() {
    this.hideSignUp()
    this.showLogin()
  }
}
