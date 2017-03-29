import Vue, { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AddressList from 'src/components/customer/AddressList'
import AddressDetail from 'src/components/customer/AddressDetail'

import {
  GET_CUSTOMER_INFO,
  PUT_DEFAULT_ADDRESS,
  PUT_ADD_ADDRESS,
  PUT_UPDATE_ADDRESS
}
  from 'src/infrastructure/store/customer_info_types'

import ApiRequestBase from 'src/models/customer/ApiRequestBase'
import CustomerInfo from 'src/models/customer/CustomerInfo'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'
import AddAddressRequest from 'src/models/customer/AddAddressRequest'
import UpdateAddressRequest from 'src/models/customer/UpdateAddressRequest'

const emptyAddress = {
  createdAt: '',
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
      putDefaultAddress: PUT_DEFAULT_ADDRESS,
      addAddress: PUT_ADD_ADDRESS,
      updateAddress: PUT_UPDATE_ADDRESS
    }),

    defaultChangedEventHandler(this: Component, addrId) {
      let customerInfo: CustomerInfo = this['customerInfo']
      let putDefaultRequest: SetDefaultRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        addressId: addrId
      }
      this['putDefaultAddress'](putDefaultRequest)
    },

    updateAddressEventHandler(this: Component, addr) {
      this['showAddressDetails'] = true
      this['addressDetails'] = addr
    },

    addNewAddress(this: Component) {
      this['showAddressDetails'] = true
      this['addressDetails'] = emptyAddress
    },

    cancelAddressDetails(this: Component) {
      this['showAddressDetails'] = false
    },

    saveAddressDetails(this: Component, addressDetails) {
      this['showAddressDetails'] = false

      let customerInfo: CustomerInfo = this['customerInfo']

      if (addressDetails.id) {
        let request: UpdateAddressRequest = {
          customer_id: customerInfo.id,
          version: customerInfo.version,
          addressDetails
        }
        this['updateAddress'](request)
      } else {
        let request: AddAddressRequest = {
          customer_id: customerInfo.id,
          version: customerInfo.version,
          newAddressDetails: addressDetails
        }
        this['addAddress'](request)
      }
    }
  },

  components: {
    AddressDetail,
    AddressList
  }
}
