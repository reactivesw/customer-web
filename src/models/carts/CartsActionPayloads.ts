/**
 * Created by alanzhang on 17/4/1.
 */

namespace Carts.ActionPayloads {
  export interface AddLineItem {
    productId: string,
    variantId: number,
    quantity: number
  }

  export interface RemoveLineItem {
    lineItemId: string,
    quantity: number
  }

  export interface SetLineItemQuantity {
    lineItemId: string,
    quantity: number
  }

  export interface SetCustomerId {
    customerId: string
  }
}
