import ApiRequestBase from './ApiRequestBase'
import CustomerInfoData from './CustomerInfoData'

interface UpdateCustomerInfoRequest extends ApiRequestBase {
  customerInfoData: CustomerInfoData
}

export default UpdateCustomerInfoRequest
