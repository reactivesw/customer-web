import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AddressList from 'src/components/customer/AddressList'
import AddressDetail from 'src/components/customer/AddressDetail'
import { GET_CUSTOMER } from 'src/infrastructure/store/auth_types'

export default {
  name: 'Addresses',
  data() {
    return {
      showAddress: false
    }
  },
  computed: {
    ...mapGetters({
      customer: GET_CUSTOMER
    })
  },
  components: {
    AddressDetail,
    AddressList
  }
}
