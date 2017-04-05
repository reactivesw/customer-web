import Vue from 'vue'
import Component from 'vue-class-component'

import { GET_CUSTOMER_INFO }
  from 'src/infrastructure/store/modules/customer_info/getters'
import { FETCH_CUSTOMER_INFO, UPDATE_CUSTOMER_INFO }
  from 'src/infrastructure/store/modules/customer_info/actions'

import CustomerInfo from 'src/models/customer/CustomerInfo'
import CustomerInfoData from 'src/models/customer/CustomerInfoData'
import UpdateCustomerInfoRequest from 'src/models/customer/UpdateCustomerInfoRequest'

@Component({
})
export default class Account extends Vue {

  created() {
    this.fetchCustomerInfo()
  }

  get customerInfo() {
    let customerInfo: any = null
    const customerInfoState = this.getCustomerInfo()
    // the customerInfo may not be ready due to async action
    if (customerInfoState) {
      customerInfo = {
        id: customerInfoState.id,
        version: customerInfoState.version,
        customerName: customerInfoState.customerName,
        firstName: customerInfoState.firstName,
        lastName: customerInfoState.lastName,
        middleName: customerInfoState.middleName,
        defaultAddressId: customerInfoState.defaultAddressId
      }
    }
    return customerInfo
  }

  updateCustomerInfoEventHandler() {
    let customerInfo = this.customerInfo
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
    this.updateCustomer(request)
  }


  // following are store operatoins
  fetchCustomerInfo() {
    this.$store.dispatch(FETCH_CUSTOMER_INFO)
  }

  getCustomerInfo() {
    return this.$store.getters[GET_CUSTOMER_INFO]
  }

  updateCustomer(request: UpdateCustomerInfoRequest) {
    this.$store.dispatch(UPDATE_CUSTOMER_INFO, request)
  }
}
