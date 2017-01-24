import { Component } from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/frame/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'
import * as authTypes from 'src/infrastructure/store/auth_types'

export default {
  name: 'Signup',

  data() {
    return {
      email: '',
      pwd: '',
      repeatPwd: ''
    }
  },

  computed: {
    showSignup(this: Component) { return this['$store'].state.modal_dialogs.showSignup }
  },

  methods: {
    ...mapActions({
      hideSignup: modalDialogsTypes.HIDE_SIGNUP,
      showLogin: modalDialogsTypes.SHOW_LOGIN,
      signup: authTypes.SIGN_UP
    }),

    async submitSignup(this: Component) {
      // form is validate and password is the same as repeat password.
      try {
        if (this['$refs'].signupForm.checkValidity() &&
            this['pwd'] === this['repeatPwd'] &&
            this['pwd'].length >= 6) {
          await this['signup'](this['email'], this['pwd'])
        }
      } catch (e) {
        // TODO: handle signup error like username has been taken
      }
    },

    goLogin(this: Component) {
      this['hideSignup']()
      this['showLogin']()
    }
  },

  components: {
    ModalDialog
  }
}
