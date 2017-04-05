import { Component } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import LanguageSelector from './LanguageSelector'
import { SHOW_SIGN_IN } from 'src/infrastructure/store/modal_dialogs_types'
import { GET_CUSTOMER, GET_IS_LOGGED_IN } from 'src/infrastructure/store/modules/auth/getters'

export default {
  name: 'TheHeader',

  computed: {
    ...mapGetters({
      customer: GET_CUSTOMER,
      isLoggedIn: GET_IS_LOGGED_IN
    }),

    username(this: Component) {
      if (this['customer']) {
        if (this['customer'].firstName && this['customer'].lastName) {
          return (this['customer'].firstName + this['customer'].lastName)
        } else {
          return this['customer'].email
        }
      }
      return ''
    }
  },

  methods: {
    ...mapActions({
      showSignIn: SHOW_SIGN_IN
    })
  },

  components: {
    LanguageSelector
  }
}
