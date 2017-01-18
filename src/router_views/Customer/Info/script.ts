import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { GET_CUSTOMER } from 'src/infrastructure/store/auth_types'

export default {
  name: 'Info',
  computed: {
    ...mapGetters({
      customer: GET_CUSTOMER
    })
  }
}
