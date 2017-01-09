import { Component } from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/frame/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'

export default {
  name: 'Signup',

  computed: {
    showSignup(this: Component) { return this['$store'].state.modal_dialogs.showSignup }
  },

  methods: {
    ...mapActions({
      hideSignup: modalDialogsTypes.HIDE_SIGNUP,
      showLogin: modalDialogsTypes.SHOW_LOGIN
    }),

    goLogin(this: Component) {
      this['hideSignup']()
      this['showLogin']()
    },

    submitSignup(this: Component) {
      // TODO: check form field validity, this['$refs'].signupForm.checkValidity()
    }
  },

  components: {
    ModalDialog
  }
}
