import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AddressList from 'src/components/customer/AddressList'
import AddressDetail from 'src/components/customer/AddressDetail'
import { GET_CUSTOMER_INFO, UPDATE_CUSTOMER_INFO } from 'src/infrastructure/store/customer_info_types'

export default {
  name: 'Addresses',
  computed: {
    ...mapGetters({
      customerInfo: GET_CUSTOMER_INFO
    })
  },

  methods: {
    ...mapActions({
      updateCustomerInfo: UPDATE_CUSTOMER_INFO
    }),

    changeDefaultAddress(this: Component, addrId) {
      let ci = this['customerInfo']
      let infoRequest = {
        id: ci.id,
        version: ci.version,
        customerName: ci.customerName,
        firstName: ci.firstName,
        lastName: ci.lastName,
        middleName: ci.middleName,
        dateOfBirth: ci.dateOfBirth,
        locale: ci.locale,
        defaultAddressId: addrId
      }
      this['updateCustomerInfo'](infoRequest)
    }
  },

  components: {
    AddressDetail,
    AddressList
  }
}
