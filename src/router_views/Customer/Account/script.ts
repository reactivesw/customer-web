import Vue from 'vue'
import Component from 'vue-class-component'

import {
  GET_CUSTOMER_INFO
} from 'src/infrastructure/store/modules/customer_info/getters'
import {
  FETCH_CUSTOMER_INFO, UPDATE_CUSTOMER_INFO
} from 'src/infrastructure/store/modules/customer_info/actions'

import CustomerInfoData from 'src/models/customer/CustomerInfoData'
import UpdateCustomerInfoRequest from 'src/models/customer/UpdateCustomerInfoRequest'
import { UpdatePasswordRequest } from 'src/infrastructure/api_client/auth'
import { GET_CUSTOMER } from 'src/infrastructure/store/modules/auth/getters'
import { UPDATE_PASSWORD } from 'src/infrastructure/store/modules/auth/actions'

@Component({})
export default class Account extends Vue {
  editingPwd: boolean = false // this variable toggle edit info/password ui.

  successAlert: string = ''
  errorAlert: string = ''

  oldPassword: string = ''
  newPassword: string = ''

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

  async updateCustomerPwdEventHandler() {
    let request:UpdatePasswordRequest = {
      customerId: this.customerInfo.id,
      version: this.customerInfo.version,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }
    try {
      await this.$store.dispatch(UPDATE_PASSWORD, request)
      this.errorAlert = this['$t']('customer.update_pwd_success')
    } catch (e) {
      this.errorAlert = this['$t']('customer.update_pwd_failed')
    }
  }

  // following are store operatoins
  fetchCustomerInfo() {
    this.$store.dispatch(FETCH_CUSTOMER_INFO)
  }

  getCustomerInfo() {
    return this.$store.getters[GET_CUSTOMER_INFO]
  }

  get customer() {
    return this.$store.getters(GET_CUSTOMER)
  }

  async updateCustomer(request: UpdateCustomerInfoRequest) {
    try {
      this.successAlert = ''
      this.errorAlert = ''
      await this.$store.dispatch(UPDATE_CUSTOMER_INFO, request)
      this.successAlert = this['$t']('customer.update_info_success')
    } catch(e) {
      this.errorAlert = this['$t']('customer.update_info_failed')
      throw e
    }
  }
}
