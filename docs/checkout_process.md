# Checkout Process

## 1. Introduction
A cart checkout requires four pieces of data from a customer:

* shopping cart: cart details and total
* customer account: we don't allow anonymous checkout though anonymous cart operations are allowed.
* shipping info: a full name and address details
* payment info: credit card details

The design of the customer checkout UI is based on collecting and presenting the four pieces of information. Before placing an order, the cusotmer is allowed to change any piece of the data. Once a customer places an order, he/she is not allowed to change the data.

## 2. Basic Functions
A customer may be in different stages during the checkout process when one or more pieces of data are not available.

### 2.1. Login Stage
A customer must login to checkout. 

* If not, show the login/signup view before the customer can see the checkout view. 
* If a customer still not logged after showing login/signup view, go to /cart. 
* If a customer is logged in, the cart items added as an anonymous user will be merged into the logged customer's cart.

### 2.2. Shipping Info Stage
* If a customer doesn't have shipping info (no shipping address), he/she must add an address.
* If a customer has one or more shipping addresses, he/she can change the shipping address or add a new shipping address. If a new shipping address is added, it's selected as the default shipping address.

### 2.3. Payment Info Stage
* If a customer doesn't have payment info, he/she must add payment info.
* If a customer has one or more payment methods, he/she can change the payment method or add a new payment method. If a new payment method is added, it's selected as the default payment method.

### 2.4. Review Stage
* If a customer is logged in and has a default shipping address and a default payment method, an order review page with all information is presented for the customer to place the order.
* The customer is allowed to perform all actions before placing the order: logout, change cart details, continue shopping, change/add address, change/add payment method.

### 2.5. The order of Stage
The order of info checking is: 1) login statue. 2) shipping info. 3) payment info. A customer only see a stage if the corresponding info is missing. If all info are there, the final review page is shown to allow a customer to change anything.  

## 3. Checkout View Layout
The checkout view has three sections: top-left, top-right and bottom.

* The top-left is the area for shipping and billing information.
* The top-right is the area for order summary.
* The bottom is the area for cart details.

The order summary is alway shown but the "Place Order" button is disabled if any requried info is missing. 

* If the customer has no shipping address, the "add a shipping address" view is shown. When the user add a new address, the address is automatically selected. When the customer has at least one shipping address but no select address, the address list is shown to let the user select a shipping address. The "Next" button is disabled unless there is a selected address. 
* If the customer has a selected shipping address but not a selected method, the payment info is shown that has the same adding/chaning/selecting logic as the shipping info. 
* When a logged customer has a selected shipping address and a selected payment meethod, a final review page with all information is shown. A customer can change any info before he/she clicks the "Place Order" button. 





