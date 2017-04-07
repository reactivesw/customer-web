import { Component } from 'vue'

export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    doSignIn: function (this: Component) {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          this['signIn'](response)
        } else {
          FB.login((response) => {
            if ( response.status === 'connected' ) {
              this['signIn'](response)
            } else {
              this['$emit']('error', response)
            }
          })
        }
      })
    },

    signIn ( this: Component, response ) {
      if ( response.status === 'connected' ) {
        const data = {
          userID: response.authResponse.userID,
          accessToken: response.authResponse.accessToken,
          expiresIn: response.authResponse.expiresIn,
          signedRequest: response.authResponse.signedRequest
        }
        this[ '$emit' ]( 'signIn', data )
      }
    }
  }
}

