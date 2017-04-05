/**
 * To get rid of IDE error message about import vue components in ts code.
 *
 * Assume any import statements started with 'src/router_views' or 'src/components' are vue components,
 * tsc will't analysis source code since we 'declare' those modules.
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
