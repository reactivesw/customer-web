// this interface defines common API interface for both request and result
interface ApiRequestBase {
  customer_id: string,   // the customer id
  version: string  // the customer version field
}

export default ApiRequestBase
