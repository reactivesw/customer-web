import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { GET_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

export default {
  name: 'Info',

  computed: mapGetters({
    customer: GET_CUSTOMER_INFO
  })
}
