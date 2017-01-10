import * as Vue from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/frame/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'
import * as authTypes from 'src/infrastructure/store/auth_types'

import * as GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

export default {
  name: 'Login',

  data () {
    return {
      googleSignInParams: {
        client_id: process.env.GOOGLE_CLIENT_ID
      }
    }
  },

  computed: {
    showLogin(this: Vue.Component) { return this['$store'].state.modal_dialogs.showLogin }
  },

  methods: {
    ...mapActions({
      hideLogin: modalDialogsTypes.HIDE_LOGIN,
      showSignup: modalDialogsTypes.SHOW_SIGNUP,
      signIn: authTypes.SIGN_IN
    }),

    submitLogin() {
      // TODO: check form field validity, this['$refs'].signupForm.checkValidity()
    },

    goSignup(this: Vue.Component) {
      this['hideLogin']()
      this['showSignup']()
    },

    goForgotPwd(this: Vue.Component) {
      this['hideLogin']()
      // TODO: redirect to forgot password page
    },

    onGoogleSignIn(this: Vue.Component, googleUser) {
      const profile = googleUser.getBasicProfile()
      const id_token = googleUser.getAuthResponse().id_token
      this['signIn']({type: 'google', id_token})
    },

    onGoogleSignInError(error) {
      console.log('sign in error: ', error) // TODO: tell user their is a error happend
    }
  },

  components: {
    ModalDialog
  }
}
