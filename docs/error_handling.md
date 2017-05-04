# Error Handling

## 1. Introduction

This doc mean to give a generic guide of handling ajax errors of customer-web.

There are two type of ajax errors:

1. expected error, for example "username has been taken".
2. unexpected error, for example "server internal error".

We can handle expected errors properly, for the unexpected errors, we need to re-throw them to leave some clue for debugging.

## 2. Workflow

There're three parts involved in ajax error handling: api client, vuex actions, vue components

The api client(Backend API) do the ajax job, make it the source of ajax errors.

Vuex actions use api client, but it doesn't have enough knowledge to handle it. So we don't discuss it here.

The proper place to handle errors is vue components. Catch Errors from api client in components, display them to user, and re-throw unexpected errors.

### 2.1 Api client

1. `try...catch...` a async ajax call.

2. Unify expected errors into api client defined errors, to make it easier for components to handle.

    ```javascript
    export const PASSWORD_NOT_MATCH = 'auth/PASSWORD_NOT_MATCH'
    ```
    
    The value of error identifier should be global unique, suggest start with the api client file name like 'auth/'.  

3. Re-throw unexpected errors without modify.

### 2.2 Vue Component

In vue components, `try...catch...` action dispatch, catch errors and notify user. Re-throw those don't expected.

```javascript
export default {
  // ...
  
  async signUp() {
    try {
      await this.$store.dispatch(SIGN_UP)
    } catch (e) {
      switch (e.message) {
        case USER_EXIST:
          // notify user the username he want has been taken.
        default:
          // re-throw unexpected errors after notify user that unknow error happened.
          throw e
      }
    }
  },
  
  // ...
}
```

Only a component itself know how to notify user, so there could be a lot of different way to handle errors, for instance:

- Show a [bootstrap alert](http://v4-alpha.getbootstrap.com/components/alerts/) to notify user what's wrong.
- Show a modal to notify user what's wrong, and prevent them interact with UI.
- Show a special UI if there are no proper place to show alert. (when visit product detail with a invalid product id, we should notify user product can't find product.)
- Redirect to index(first category) when visit any unmatched route.
