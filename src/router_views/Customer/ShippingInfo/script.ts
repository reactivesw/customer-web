import Vue, { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import AddressList from 'src/components/customer/AddressList'
import AddressDetail from 'src/components/customer/AddressDetail'
import ConfirmDialog from 'src/components/utility/ConfirmDialog'

import {
  GET_CUSTOMER_INFO,
  CHANGE_DEFAULT_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS
} from 'src/infrastructure/store/customer_info_types'

import AddressDetails from 'src/models/customer/AddressDetails'
import ApiRequestBase from 'src/models/customer/ApiRequestBase'
import CustomerInfo from 'src/models/customer/CustomerInfo'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'
import AddAddressRequest from 'src/models/customer/AddAddressRequest'
import UpdateAddressRequest from 'src/models/customer/UpdateAddressRequest'
import DeleteAddressRequest from 'src/models/customer/DeleteAddressRequest'

function getEmptyAddress(): AddressDetails {
  return {
    id: '', createdAt: '',
    lastModifiedAt: '', fullName: '',
    zip: '', phone: '', firstLine: '',
    secondLine: '', country: '',
    state: '', city: ''
  }
}

export default {
  name: 'ShippingInfo',

  data() {
    return {
      showAddressDetails: false,
      addressDetails: getEmptyAddress(),

      // for change default address confirmation dialog
      confirmChangeDefault: false,
      confirmChangeDefaultAddressId: '',

      // for delete address confirmation dialog
      confirmDeleteAddress: false,
      confirmDeleteAddressId: ''
    }
  },

  computed: {
    ...mapGetters({
      customerInfo: GET_CUSTOMER_INFO
    })
  },

  methods: {
    ...mapActions({
      putDefaultAddress: CHANGE_DEFAULT_ADDRESS,
      addAddress: ADD_ADDRESS,
      updateAddress: UPDATE_ADDRESS,
      deleteAddress: DELETE_ADDRESS
    }),

    defaultChangedEventHandler(this: Component, addrId) {
      this['confirmChangeDefault'] = true
      this['confirmChangeDefaultAddressId'] = addrId
    },

    confirmYesChangeDefaultEventHandler(this: Component) {
      this['confirmChangeDefault'] = false
      let addressId = this['confirmChangeDefaultAddressId']
      let customerInfo: CustomerInfo = this['customerInfo']
      let putDefaultRequest: SetDefaultRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        addressId
      }
      this['putDefaultAddress'](putDefaultRequest)
    },

    confirmNoChangeDefaultEventHandler(this: Component) {
      this['confirmChangeDefault'] = false
    },

    deleteAddressEventHandler(this: Component, addrId) {
      this['confirmDeleteAddress'] = true
      this['confirmDeleteAddressId'] = addrId
    },

    confirmYesDeleteAddressEventHandler(this: Component) {
      this['confirmDeleteAddress'] = false
      let id = this['confirmDeleteAddressId']
      let customerInfo: CustomerInfo = this['customerInfo']
      let request: DeleteAddressRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        id
      }
      this['deleteAddress'](request)
    },

    confirmNoDeleteAddressEventHandler(this: Component) {
      this['confirmDeleteAddress'] = false
    },

    updateAddressEventHandler(this: Component, addr) {
      this['showAddressDetails'] = true
      this['addressDetails'] = addr
    },

    addNewAddress(this: Component) {
      this['showAddressDetails'] = true
      this['addressDetails'] = getEmptyAddress()
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
    AddressList,
    ConfirmDialog
  }
}
