# User Experience

## async requests

### For requests triggered by pressing a button

  Show a loading indicator in button. Then hide it no matter the request success or fail after finished.

  Use [LoadingButton](src/components/utility/LoadingButton) to make this easier.
  
  Example(use single file component syntax to make example simpler):
  
  ```html
  <template>
    <LoadingButton :loading="submitting"
              @click="submit">
      Submit
    </LoadingButton>
  </template>
  
  <script>
    import LoadingButton from 'src/components/utility/LoadingButton'
    
    export default {
      data () {
        return {
          submitting: false
        }
      },
      
      methods: {
        async submit () {
          // set loading indicator to true before async request
          this.submitting = true
          
          // send the async request
          await this.sendSomeAsyncRequest()
          
          // set loading indicator back to false after async request return
          this.submitting = false
        }
      },
      
      components: {
        LoadingButton
      }  
    }
  </script>
  ```
  
  When using `try...catch...`, set loading indicator back in finally block.
  
  ```javascript
  this.submitting = true
  try {
    await sendSomeAsyncRequest()
  } catch (e) {
    // handle errors
  } finally {
    this.submitting = false
  }
  ```
