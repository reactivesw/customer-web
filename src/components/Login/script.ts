import { Component } from 'vue'
import { mapActions } from 'vuex'
import ModalDialog from 'src/components/frame/ModalDialog'
import * as modalDialogsTypes from 'src/infrastructure/store/modal_dialogs_types'

export default {
  name: 'LoginModal',

  computed: {
    showLogin(this: Component) { return this['$store'].state.modal_dialogs.showLogin }
  },

  methods: {
    ...mapActions({
      hideLogin: modalDialogsTypes.HIDE_LOGIN
    })
  },

  components: {
    ModalDialog
  }
}
