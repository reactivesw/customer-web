import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class FacebookButton extends Vue {
  email = ''
  password = ''

  doLogin() {
    FB.login((response) => {
      if (response.status === 'connected') {
        this['login'](response)
      } else {
        this['$emit']('error', response)
      }
    })
  }

  login (response) {
    if (response.status === 'connected') {
      const data = {
        userID: response.authResponse.userID,
        accessToken: response.authResponse.accessToken,
        expiresIn: response.authResponse.expiresIn,
        signedRequest: response.authResponse.signedRequest
      }
      this.$emit('login', data)
    }
  }
}

