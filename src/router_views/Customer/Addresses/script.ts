import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AddressList from 'src/components/customer/AddressList'
import AddressDetail from 'src/components/customer/AddressDetail'
import { GET_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

export default {
  name: 'Addresses',
  data() {
    return {
      showAddress: false
    }
  },
  computed: {
    ...mapGetters({
      customerInfo: GET_CUSTOMER_INFO
    })
  },
  components: {
    AddressDetail,
    AddressList
  }
}
