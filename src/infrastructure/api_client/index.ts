import * as carts from './carts'
import * as products from './products'
import * as categories from './categories'
import * as auth from './auth'
import { setNetworkErrorHandler } from './http'

export { carts, products, categories, auth, setNetworkErrorHandler }

export default {
  carts,
  products,
  categories,
  auth
}
