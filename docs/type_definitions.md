# Type Definitions

## fbsdk.d.ts

Declare a FB global variable for Facebook login sdk.

## gapi.d.ts

Declare a gapi global variable for Google login sdk.

## vue.d.ts

Make tsc compiler stop complain about importing vue components by ignore all imports start with path 'src/router_views/*' or 'src/components/*'.

For instance, these imports will be treated as a typical vue component without any type checking: 
```
import AVueComponent from 'src/router_views/AVueComponent'
// or
import AVueComponent from 'src/components/AVueComponent'
```
