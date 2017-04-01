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
A customer must login to checkout. If not, show the login/signup view before the customer can see the checkout view. The cart items added as an anonymous user will be kept as the current user's cart times.

### 2.2. Shipping Info Stage
* If a customer doesn't have shipping info (no shipping address), he/she must add an address.
* If a customer has one or more shipping addresses, he/she can change the shipping address or add a new shipping address. If a new shipping address is added, it's selected as the default shipping address.

### 2.3. Payment Info Stage
* If a customer doesn't have payment info, he/she must add payment info.
* If a customer has one or more payment methods, he/she can change the payment method or add a new payment method. If a new payment method is added, it's selected as the default payment method.

### 2.4. Review Stage
* If a customer is logged in and has a default shipping address and a default payment method, an order review page with all information is presented for the customer to place the order.
* The customer is allowed to perform all actions before placing the order: logout, change cart details, continue shopping, change/add address, change/add payment method.

## 3. Checkout View Layout
The checkout view has three sections: top-left, top-right and bottom.

* The top-left is the area for shipping and billing information.
* The top-right is the area for order summary.
* The bottom is the area for cart details.

Before the final review stage, the top-left section shows the required information. For example, if there is not a selected shipping address, an "add new shipping address" form should be in this section. If there is not a selected payment method, an "add new payment method" form is shown in this section.

When a logged customer has a selected shipping address and a selected payment meethod, a final review page with all information is shown. A customer can change any data before he/she places the order.




