import Vue from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/utility/ModalDialog'
import FacebookBtn from 'src/components/TheHeader/SignIn/FacebookButton'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'
import { ERRORES as AUTH_ERRORES } from 'src/infrastructure/api_client/auth'

import * as GSignInButton from 'vue-google-signin-button'
import { SIGN_IN } from 'src/infrastructure/store/modules/auth/actions'
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
      passwordFeedback: null,
      signinFeedback: null,
      googleLoginIsReady: false,
      facebookLoginIsReady: false
    }
  },

  computed: {
    showSignIn(this: Vue.Component) { return this['$store'].state.modal_dialogs.showSignIn }
  },

  created (this: Vue.Component) {
    this['initFacebookLogin']().then(() => this['facebookLoginIsReady'] = true)
    this['initGoogleLogin']().then(() => this['googleLoginIsReady'] = true)
  },

  methods: {
    ...mapActions({
      hideSignIn: modalDialogsTypes.HIDE_SIGN_IN,
      showSignUp: modalDialogsTypes.SHOW_SIGN_UP,
      signIn: SIGN_IN
    }),

    async submitSignIn(this: Vue.Component) {
      try {
        // clean feedbacks
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
            this['passwordFeedback'] = Vue['t']('alert.credential_error')
            break
          case AUTH_ERRORES.PASSWORD_NOT_SECURE:
            this['passwordFeedback'] = Vue['t']('alert.credential_error')
            break
          case AUTH_ERRORES.PASSWORD_NOT_MATCH:
            this['passwordFeedback'] = Vue['t']('alert.credential_error')
            break
          default:
            this['signinFeedback'] = Vue['t']('alert.signin_error')
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

    onGoogleSignInError(this: Vue.Component, error) {
      // this['signinFeedback'] = Vue['t']('alert.social_signin_error')
      this['signinFeedback'] = Vue['t']('alert.signin_error')
    },

    onFacebookSignIn(this: Vue.Component, response) {
      this['signIn']({type: 'facebook', response})
    },

    onFacebookSignInError(this: Vue.Component, errorResponse) {
      this['signinFeedback'] = Vue['t']('alert.signin_error')
    },

    // load facebook & google scripts
    initFacebookLogin() {
      return new Promise((resolve, reject) => {
        try {
          /* tslint:disable */
          (<any>window).fbAsyncInit = function () {
            FB.init( {
              appId: process.env.FACEBOOK_APP_ID,
              xfbml: true,
              version: 'v2.8'
            } );
            FB.AppEvents.logPageView();
            resolve()
          };

          (function ( d, s, id ) {
            var js, fjs = d.getElementsByTagName( s )[ 0 ];
            if ( d.getElementById( id ) ) {
              return;
            }
            js = d.createElement( s );
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            (<any>fjs.parentNode).insertBefore( js, fjs );
          }( document, 'script', 'facebook-jssdk' ));
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
          (function ( d, s, id ) {
            var js, fjs = d.getElementsByTagName( s )[ 0 ];
            if ( d.getElementById( id ) ) {
              return;
            }
            js = d.createElement( s );
            js.id = id;
            js.onload = function () {
              // google initialized
              resolve()
            }
            js.src = "//apis.google.com/js/api:client.js";
            (<any>fjs.parentNode).insertBefore( js, fjs );
          }( document, 'script', 'google-gapi' ));
          /* tslint:enable */
        } catch (e) {
          reject(e)
        }
      })
    }
  },

  components: {
    ModalDialog,
    FacebookBtn
  }
}
