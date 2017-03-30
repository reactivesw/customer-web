import { Component } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { GET_CUSTOMER_INFO, UPDATE_CUSTOMER_INFO }
  from 'src/infrastructure/store/customer_info_types'

import CustomerInfoData from 'src/models/customer/CustomerInfoData'
import UpdateCustomerInfoRequest from 'src/models/customer/UpdateCustomerInfoRequest'

export default {
  name: 'CustomerInfo',

  computed: {
    ...mapGetters({
      customerInfo: GET_CUSTOMER_INFO
    })
  },

  methods: {
    ...mapActions({
      updateCustomer: UPDATE_CUSTOMER_INFO
    }),

    updateCustomerInfoEventHandler(this: Component) {
      let customerInfo = this['customerInfo']
      let customerInfoData: CustomerInfoData = {
        customerName: customerInfo.customerName,
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        middleName: customerInfo.middleName,
        defaultAddressId: customerInfo.defaultAddressId
      }

      let request: UpdateCustomerInfoRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        customerInfoData
      }
      this['updateCustomer'](request)
    }
  }
}
