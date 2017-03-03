import * as Vue from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/utility/ModalDialog'
import FacebookBtn from './FacebookButton'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'
import * as authTypes from 'src/infrastructure/store/auth_types'
import { ERRORES as AUTH_ERRORES } from 'src/infrastructure/api_client/auth'

import * as GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)

export default {
  name: 'SignIn',

  data () {
    return {
      googleSignInParams: {
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      email: '',
      pwd: '',
      usernameFeedback: null,
      passwordFeedback: null
    }
  },

  computed: {
    showSignIn(this: Vue.Component) { return this['$store'].state.modal_dialogs.showSignIn }
  },

  methods: {
    ...mapActions({
      hideSignIn: modalDialogsTypes.HIDE_SIGN_IN,
      showSignUp: modalDialogsTypes.SHOW_SIGN_UP,
      signIn: authTypes.SIGN_IN
    }),

    async submitSignIn(this: Vue.Component) {
      try {
        // clean feedbacks
        this['usernameFeedback'] = null
        this['passwordFeedback'] = null

        await this['signIn']({
          type: 'email',
          email: this['email'],
          pwd: this['pwd']
        })
      } catch (e) {
        // TODO: handle sign in error like password not match.
        // server response is not correct.
        switch (e.message) {
          case AUTH_ERRORES.USER_NOT_FOUND:
            this['usernameFeedback'] = 'user name not found'
            break
          default:
            throw e
        }
      }
    },

    goSignUp(this: Vue.Component) {
      this['hideSignIn']()
      this['showSignUp']()
    },

    goForgotPwd(this: Vue.Component) {
      this['hideSignIn']()
      // TODO: redirect to forgot password page
    },

    onGoogleSignIn(this: Vue.Component, googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      this['signIn']({type: 'google', id_token})
    },

    onGoogleSignInError(error) {
      console.log('sign in error: ', error) // TODO: tell user their is a error happend
    },

    onFacebookSignIn(this: Vue.Component, facebookUser) {
      this['signIn']({type: 'facebook', facebookUser})
    }
  },

  components: {
    ModalDialog,
    FacebookBtn
  }
}
