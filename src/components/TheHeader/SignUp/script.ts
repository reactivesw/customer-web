import * as Vue from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/utility/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'
import * as authTypes from 'src/infrastructure/store/auth_types'
import { ERRORES as AUTH_ERRORES } from 'src/infrastructure/api_client/auth'

export default {
  name: 'SignUp',

  data() {
    return {
      email: '',
      pwd: '',
      repeatPwd: '',
      usernameFeedback: null
    }
  },

  computed: {
    showSignUp(this: Vue.Component) { return this['$store'].state.modal_dialogs.showSignUp }
  },

  methods: {
    ...mapActions({
      hideSignUp: modalDialogsTypes.HIDE_SIGN_UP,
      showSignIn: modalDialogsTypes.SHOW_SIGN_IN,
      signUp: authTypes.SIGN_UP
    }),

    checkFormValidity(this: Vue.Component) {
      // validate custom rules

      // TODO: implement password secure stratage
      // if (this['pwd'].length < 6) {
      //   this['$refs'].pwd.setCustomValidity(this['$t']('alert.password_not_secure'))
      // } else {
      //   this['$refs'].pwd.setCustomValidity('')
      // }

      this['$refs'].rpwd.setCustomValidity('')
      if (this['pwd'] !== this['repeatPwd']) {
        this['$refs'].rpwd.setCustomValidity(this['$t']('alert.confirm_password_not_match'))
      }

      // Validate required fields, email format and other predefined rules
      this['$refs'].signUpForm.checkValidity()
    },

    async submitSignUp(this: Vue.Component) {
      try {
        // it has already passed all validation when enter this function
        await this['signUp']({ email: this['email'], password: this['pwd'] })
      } catch (e) {
        switch (e.message) {
          case AUTH_ERRORES.USER_EXIST:
            this['usernameFeedback'] = this['$t']('alert.user_exist')
            break
          default:
            throw e
        }
      }
    },

    goSignIn(this: Vue.Component) {
      this['hideSignUp']()
      this['showSignIn']()
    }
  },

  components: {
    ModalDialog
  }
}
