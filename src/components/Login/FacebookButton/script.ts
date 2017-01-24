import { Component } from 'vue'

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
          const data = { userId: response.authResponse.userID, userName: '' }
          FB.api('/me', (response) => {
            data.userName = response.name
            this['$emit']('login', data)
          })
        }
      })
    }
  }
}
