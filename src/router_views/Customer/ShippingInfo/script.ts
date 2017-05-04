import Vue from 'vue'
import Component from 'vue-class-component'

import AddressList from 'src/components/customer/AddressList'
import AddressDialog from 'src/components/customer/AddressDialog'
import ConfirmDialog from 'src/components/utility/ConfirmDialog'

import {
  GET_CUSTOMER_INFO
} from 'src/infrastructure/store/modules/customer_info/getters'

import {
  FETCH_CUSTOMER_INFO,
  CHANGE_DEFAULT_ADDRESS,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS
} from 'src/infrastructure/store/modules/customer_info/actions'

import AddressDetails from 'src/models/customer/AddressDetails'
import ApiRequestBase from 'src/models/customer/ApiRequestBase'
import CustomerInfo from 'src/models/customer/CustomerInfo'
import SetDefaultRequest from 'src/models/customer/SetDefaultRequest'
import AddAddressRequest from 'src/models/customer/AddAddressRequest'
import UpdateAddressRequest from 'src/models/customer/UpdateAddressRequest'
import DeleteAddressRequest from 'src/models/customer/DeleteAddressRequest'

@Component({
  components: {
    AddressDialog,
    AddressList,
    ConfirmDialog
  }
})
export default class ShippingInfo extends Vue {
  // customerInfo: CustomerInfo

  showAddressDetails = false
  // always return empty address
  addressDetails: AddressDetails = getEmptyAddressHelp()

  // for change default address confirmation dialog
  confirmChangeDefault = false
  confirmChangeDefaultAddressId = ''

  // for delete address confirmation dialog
  confirmDeleteAddress = false
  confirmDeleteAddressId = ''

  // for saving indicator in save button
  saving = false

  created() {
    this.fetchCustomerInfo()
  }

  // BEGIN: change default, confirm the change
  defaultChangedEventHandler(addrId) {
    this.confirmChangeDefault = true
    this.confirmChangeDefaultAddressId = addrId
  }

  confirmYesChangeDefaultEventHandler() {
    changeDefaultAddressHelp(this)
  }

  confirmNoChangeDefaultEventHandler() {
    this.confirmChangeDefault = false
  }

  // END: change default

  // BEGIN: delete event, confirm the delete
  deleteAddressEventHandler(addrId) {
    this.confirmDeleteAddress = true
    this.confirmDeleteAddressId = addrId
  }

  confirmYesDeleteAddressEventHandler() {
    deleteAddressHelp(this)
  }

  confirmNoDeleteAddressEventHandler() {
    this.confirmDeleteAddress = false
  }

  // END: delete

  // BEGIN: update and add
  updateAddressEventHandler(addr) {
    this.showAddressDetails = true
    this.addressDetails = addr
  }

  addNewAddress() {
    this.showAddressDetails = true
    this.addressDetails = getEmptyAddressHelp()
  }

  cancelAddressDetails() {
    this.showAddressDetails = false
  }

  saveAddressDetailsEventHandler(addressDetails) {
    saveAddressDetailsHelp(this, addressDetails)
  }

  // END: update and add

  // following are store operations
  fetchCustomerInfo() {
    this.$store.dispatch(FETCH_CUSTOMER_INFO)
  }

  get customerInfo(): CustomerInfo {
    return this.$store.getters[GET_CUSTOMER_INFO]
  }

  changeDefaultAddress(request: SetDefaultRequest) {
    this.$store.dispatch(CHANGE_DEFAULT_ADDRESS, request)
  }

  async addAddress(request: AddAddressRequest) {
    await this.$store.dispatch(ADD_ADDRESS, request)
  }

  async updateAddress(request: UpdateAddressRequest) {
    await this.$store.dispatch(UPDATE_ADDRESS, request)
  }

  deleteAddress(request) {
    this.$store.dispatch(DELETE_ADDRESS, request)
  }
}

function getEmptyAddressHelp(): AddressDetails {
  return {
    id: '', createdAt: '',
    lastModifiedAt: '', fullName: '',
    zip: '', phone: '', firstLine: '',
    secondLine: '', country: '',
    state: '', city: ''
  }
}

async function saveAddressDetailsHelp(vm: ShippingInfo, addressDetails) {
  vm.saving = true

  let customerInfo: CustomerInfo = vm.customerInfo

  try {
    if (addressDetails.id) {
      let request: UpdateAddressRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        addressDetails
      }
      await vm.updateAddress(request)
    } else {
      let request: AddAddressRequest = {
        customer_id: customerInfo.id,
        version: customerInfo.version,
        newAddressDetails: addressDetails
      }
      await vm.addAddress(request)
    }

    // updata/add success, hide edit dialog
    vm.showAddressDetails = false
  } catch (e) {
    // TODO: handle errors
  } finally {
    vm.saving = false
  }
}

function changeDefaultAddressHelp(vm: ShippingInfo) {
  vm.confirmChangeDefault = false
  let addressId = vm.confirmChangeDefaultAddressId
  let customerInfo = vm.customerInfo
  let request: SetDefaultRequest = {
    customer_id: customerInfo.id,
    version: customerInfo.version,
    addressId
  }
  vm.changeDefaultAddress(request)
}

function deleteAddressHelp(vm: ShippingInfo) {
  vm.confirmDeleteAddress = false
  let id = vm.confirmDeleteAddressId
  let customerInfo: CustomerInfo = vm.customerInfo
  let request: DeleteAddressRequest = {
    customer_id: customerInfo.id,
    version: customerInfo.version,
    id
  }
  vm['deleteAddress'](request)
}
