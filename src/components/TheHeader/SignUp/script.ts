import Vue from 'vue'
import VueLadda from 'vue-ladda'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/utility/ModalDialog'
import { PASSWORD_NOT_SECURE, USER_EXIST } from 'src/infrastructure/api_client/auth'
import { SIGN_UP } from 'src/infrastructure/store/modules/auth/actions'
import { HIDE_SIGN_UP, SHOW_LOGIN } from 'src/infrastructure/store/modules/modal_dialogs/actions'

export default {
  name: 'SignUp',

  data() {
    return {
      email: '',
      pwd: '',
      repeatPwd: '',
      usernameFeedback: null,
      passwordFeedback: null,
      signUpLoading: false
    }
  },

  computed: {
    showSignUp(this: Vue.Component) {
      return this['$store'].state.modal_dialogs.showSignUp
    }
  },

  methods: {
    ...mapActions({
      hideSignUp: HIDE_SIGN_UP,
      showLogin: SHOW_LOGIN,
      signUp: SIGN_UP
    }),

    checkFormValidity(this: Vue.Component) {
      this['$refs'].rpwd.setCustomValidity('')
      if (this['pwd'] !== this['repeatPwd']) {
        this['$refs'].rpwd.setCustomValidity(this['$t']('alert.confirm_password_not_match'))
      }

      // Validate required fields, email format and other predefined rules
      this['$refs'].signUpForm.checkValidity()
    },

    async submitSignUp(this: Vue.Component) {
      try {
        // clean error messages
        this['usernameFeedback'] = null
        this['passwordFeedback'] = null
        this['signUpLoading'] = true

        // it has already passed all validation when enter this function
        await this['signUp']({ email: this['email'], password: this['pwd'] })
      } catch (e) {
        switch (e.message) {
          case USER_EXIST:
            this['usernameFeedback'] = this['$t']('alert.user_exist')
            break

          case PASSWORD_NOT_SECURE:
            this['passwordFeedback'] = this['$t']('alert.password_not_secure')
            break

          default:
            throw e
        }
      } finally {
        this['signUpLoading'] = false
      }
    },

    goLogin(this: Vue.Component) {
      this['hideSignUp']()
      this['showLogin']()
    }
  },

  components: {
    ModalDialog,
    VueLadda
  }
}
