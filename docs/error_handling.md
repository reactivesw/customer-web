# Error Handling

This doc mean to give a generic guide of handling ajax errors of customer-web.

The api client(`/src/infrastructure/api_client`) do the ajax job, make it the source of ajax errors

Vuex actions(`/src/infrastructure/store/modules/*/actions.ts`) use api client, but it doesn't have enough knowledge to handle it.

Vue components is the proper place to handle expected errors: `"username has been taken"`, `"password not match"`, etc.
 
But sometimes some errors can't be handle in vue components like `"500 server internal error"` or network down. Those error should been handled globally.

Problem is es6 standard has no easy way to handle "unhandled promise errors" globally, luckly we're going to use core-js as a es6 shim for wider browser support, which provide [unhandled rejection tracking](https://github.com/zloirock/core-js#unhandled-rejection-tracking) could solve this problem.

So here is the Api error handling strategy

1. api client throw errors.
2. action do nothing.
3. components handle errors they expected.
4. global unhandled promise errors handler do the rest.

\* <small>Also, prefer `async await` to `Promise`.</small>

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

In vue components, those functions dispatch actions should be `async function` too, use `try...catch...` wrap action dispatch, catch expected errors and handle them. Re-throw those don't expected.

```javascript
export default {
  // ...
  
  async signIn() {
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

## Global Unhandled Rejection Handler

All unhandled ajax errors will be handled in `/src/infrastructure/unhandled_rejection_handler.ts`. If the application is impossible to continue, show a undismissable modal or replace whole page with error message, force user to refresh page. If not, tell user what to do next. Maybe try again later, or just tell them something is wrong but they can still going on if they think it didn't cause them trouble.

```javascript
window.onunhandledrejection = e => console.log('unhandled', e.reason, e.promise);
window.onrejectionhandled = e => console.log('handled', e.reason, e.promise);
```
