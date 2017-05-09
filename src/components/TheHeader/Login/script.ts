import Vue from 'vue'
import VueLadda from 'src/components/utility/VueLadda'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/utility/ModalDialog'
import FacebookBtn from 'src/components/TheHeader/Login/FacebookButton'

import * as GSignInButton from 'vue-google-signin-button'
import { LOGIN } from 'src/infrastructure/store/modules/auth/actions'
import { PASSWORD_NOT_MATCH, PASSWORD_NOT_VALID, USER_NOT_FOUND } from 'src/infrastructure/api_client/auth'
import { HIDE_LOGIN, SHOW_SIGN_UP } from 'src/infrastructure/store/modules/modal_dialogs/actions'
Vue.use(GSignInButton)

export default {
  name: 'Login',

  data () {
    return {
      googleLoginParams: {
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      email: '',
      pwd: '',
      passwordFeedback: null,
      loginFeedback: null,
      googleLoginIsReady: false,
      facebookLoginIsReady: false,
      loginLoading: false,
    }
  },

  computed: {
    showLogin(this: Vue.Component) {
      return this['$store'].state.modal_dialogs.showLogin
    }
  },

  created (this: Vue.Component) {
    this['initFacebookLogin']().then(() => this['facebookLoginIsReady'] = true)
    this['initGoogleLogin']().then(() => this['googleLoginIsReady'] = true)
  },

  methods: {
    ...mapActions({
      hideLogin: HIDE_LOGIN,
      showSignUp: SHOW_SIGN_UP,
      login: LOGIN
    }),

    async submitLogin(this: Vue.Component) {
      try {
        // clean feedbacks
        this['passwordFeedback'] = null
        this['loginLoading'] = true

        await this['login']({
          type: 'email',
          email: this['email'],
          pwd: this['pwd']
        })
      } catch (e) {
        // server response is not correct.
        switch (e.message) {

          case USER_NOT_FOUND:
            this['passwordFeedback'] = Vue['t']('alert.credential_error')
            break

          case PASSWORD_NOT_VALID:
            this['passwordFeedback'] = Vue['t']('alert.credential_error')
            break

          case PASSWORD_NOT_MATCH:
            this['passwordFeedback'] = Vue['t']('alert.credential_error')
            break

          default:
            this['loginFeedback'] = Vue['t']('alert.login_error')
            throw e
        }
      } finally {
        this['loginLoading'] = false
      }
    },

    goSignUp(this: Vue.Component) {
      this['hideLogin']()
      this['showSignUp']()
    },

    goForgotPwd(this: Vue.Component) {
      this['hideLogin']()
      // TODO: redirect to forgot password page
    },

    onGoogleLogin(this: Vue.Component, googleUser) {
      const id_token = googleUser.getAuthResponse().id_token
      this['login']({ type: 'google', id_token })
    },

    onGoogleLoginError(this: Vue.Component, error) {
      // this['loginFeedback'] = Vue['t']('alert.social_login_error')
      this['loginFeedback'] = Vue['t']('alert.login_error')
    },

    onFacebookLogin(this: Vue.Component, response) {
      this['login']({ type: 'facebook', response })
    },

    onFacebookLoginError(this: Vue.Component, errorResponse) {
      this['loginFeedback'] = Vue['t']('alert.login_error')
    },

    // load facebook & google scripts
    initFacebookLogin() {
      return new Promise((resolve, reject) => {
        try {
          /* tslint:disable */
          (<any>window).fbAsyncInit = function () {
            FB.init({
              appId: process.env.FACEBOOK_APP_ID,
              xfbml: true,
              version: 'v2.8'
            })
            FB.AppEvents.logPageView()
            resolve()
          };

          (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) {
              return
            }
            js = d.createElement(s)
            js.id = id
            js.src = '//connect.facebook.net/en_US/sdk.js';
            (<any>fjs.parentNode).insertBefore(js, fjs)
          }(document, 'script', 'facebook-jssdk'))
          /* tslint:enable */
        } catch (e) {
          reject(e)
        }
      })
    },

    initGoogleLogin() {
      return new Promise((resolve, reject) => {
        try {
          /* tslint:disable */
          (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0]
            if (d.getElementById(id)) {
              return
            }
            js = d.createElement(s)
            js.id = id
            js.onload = function () {
              // google initialized
              resolve()
            }
            js.src = '//apis.google.com/js/api:client.js';
            (<any>fjs.parentNode).insertBefore(js, fjs)
          }(document, 'script', 'google-gapi'))
          /* tslint:enable */
        } catch (e) {
          reject(e)
        }
      })
    }
  },

  components: {
    ModalDialog,
    FacebookBtn,
    VueLadda
  }
}
