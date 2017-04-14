import {Component} from 'vue'

export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    doLogin: function (this: Component) {
      FB.login((response) => {
        if (response.status === 'connected') {
          this['login'](response)
        } else {
          this['$emit']('error', response)
        }
      })
    },

    login (this: Component, response) {
      if (response.status === 'connected') {
        const data = {
          userID: response.authResponse.userID,
          accessToken: response.authResponse.accessToken,
          expiresIn: response.authResponse.expiresIn,
          signedRequest: response.authResponse.signedRequest
        }
        this['$emit']('login', data)
      }
    }
  }
}

