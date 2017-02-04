import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { SIGN_OUT } from 'src/infrastructure/store/auth_types'

export default {
  name: 'Product',

  methods: {
    ...mapActions({
      signOut: SIGN_OUT
    })
  }
}
