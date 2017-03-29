import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AddressList from 'src/components/customer/AddressList'
import AddressDetail from 'src/components/customer/AddressDetail'
import { GET_CUSTOMER_INFO, PUT_DEFAULT_ADDRESS }
  from 'src/infrastructure/store/customer_info_types'

import CustomerInfo from 'src/models/customer/CustomerInfo'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'

const emptyAddress = {createdAt: '',
  lastModifiedAt: '', fullName: '',
  zip: '', phone: '', firstLine: '',
  secondLine: '', country: '',
  state: '', city: ''
}

export default {
  name: 'Addresses',

  data() {
    return {
      showAddressDetails: false,
      addressDetails: emptyAddress
    }
  },

  computed: {
    ...mapGetters({
      customerInfo: GET_CUSTOMER_INFO
    })
  },

  methods: {
    ...mapActions({
      putDefaultAddress: PUT_DEFAULT_ADDRESS
    }),

    defaultChangedEventHandler(this: Component, addrId) {
      let customerInfo: CustomerInfo = this['customerInfo']
      let putDefaultRequest: SetDefaultRequest = {
        id: customerInfo.id,
        version: customerInfo.version,
        addressId: addrId
      }
      this['putDefaultAddress'](putDefaultRequest)
    },

    addNewAddress(this: Component) {
      this['showAddressDetails'] = true
      this['addressDetails'] = emptyAddress
    },

    cancelAddressDetails(this: Component) {
      this['showAddressDetails'] = false
    },

    saveAddressDetails(this: Component) {
      this['showAddressDetails'] = false
      // save ....
    },
  },

  components: {
    AddressDetail,
    AddressList
  }
}
