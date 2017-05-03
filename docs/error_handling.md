# Error Handling

This doc mean to give a generic guide of handling ajax errors of customer-web.

The api client(`/src/infrastructure/api_client`) do the ajax job, make it the source of ajax errors

Vuex actions(`/src/infrastructure/store/modules/*/actions.ts`) use api client, but it doesn't have enough knowledge to handle it.

So we handle all errors in vue components.

### Api client

1. Api client should give every expected error a constant as identifier:

    ```javascript
    export const PASSWORD_NOT_MATCH = 'auth/PASSWORD_NOT_MATCH'
    ```
    
    The value of error identifier should be global unique, suggest start with the api client file name like 'auth/'. 

2. Api client functions should be `async function`, which means they're returning Promises any way.

    ```javascript
    export async function signUp(email, password) {/*...*/}
    ```

3. Check if arguments legal, if not, don't send request, throw a error.

    ```javascript
    if (!isPasswordSecure(password)) {
      throw new Error(PASSWORD_NOT_SECURE)
    }
    ```

4. Use `try...catch...` wrap the ajax request. In catch block, throw proper Error according to response.

    ```javascript
    try {
      const response = await http.get(SOMETHING)
    } catch (e) {
      if (e.response) {
        // server responsed
        switch (e.response.data.code) {
          case 10002: throw new Error(USER_EXIST)
        }
      }
      throw e
    }
    ```

### Vuex Action

Nothing to do here, just make sure to use `async function`. 

### Vue Component

In vue components, functions dispatch actions should be `async function` too, use `try...catch...` wrap action dispatch, catch expected errors and handle them. Re-throw those don't expected.

```javascript
export default {
  // ...
  
  async signUp() {
    try {
      await this.$store.dispatch(SIGN_UP)
    } catch (e) {
      switch (e.message) {
        case USER_EXIST:
          // inform user the username he want has been taken.
        default:
          // re-throw those errors can't handled.
          throw e
      }
    }
  },
  
  // ...
}
```

There are a few ways to handle common errors:

- Show a [bootstrap alert](http://v4-alpha.getbootstrap.com/components/alerts/) to notify user something is wrong.
- Show a special UI for unexpected result if there are no proper place to show alert. (when visit product detail with a invalid product id, we should notify user product can't find product.)
- Show a offline UI indicator using [offline.js](http://github.hubspot.com/offline/docs/welcome/) notify user network is down.
- Redirect to index(first category) when visit any unmatched route.
