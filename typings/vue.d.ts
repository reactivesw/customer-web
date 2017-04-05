/**
 * To get rid of IDE error message about import vue components in ts code.
 */
import Vue = require('vue')

declare module 'src/router_views/*' {
  const value: Vue.ComponentOptions<Vue>
  export default value
}

declare module 'src/components/*' {
  const value: Vue.ComponentOptions<Vue>
  export default value
}
