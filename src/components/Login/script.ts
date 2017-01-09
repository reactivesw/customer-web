import { Component } from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/frame/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'

export default {
  name: 'Login',

  computed: {
    showLogin(this: Component) { return this['$store'].state.modal_dialogs.showLogin }
  },

  methods: {
    ...mapActions({
      hideLogin: modalDialogsTypes.HIDE_LOGIN,
      showSignup: modalDialogsTypes.SHOW_SIGNUP
    }),

    submitLogin() {
      // TODO: check form field validity, this['$refs'].signupForm.checkValidity()
    },

    goSignup(this: Component) {
      this['hideLogin']()
      this['showSignup']()
    },

    goForgotPwd(this: Component) {
      this['hideLogin']()
      // TODO: redirect to forgot password page
    }
  },

  components: {
    ModalDialog
  }
}
