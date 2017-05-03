# User Experience

## async requests

### For requests triggered by pressing a button

  Show a loading indicator in button. Then hide it no matter the request success or fail after finished.

  Use [ladda](https://github.com/hakimel/Ladda) to make this easier. Will create a utility component to wrap it.
  
  Example(use single file component syntax to make example simpler):
  
  ```html
  <template>
    <VueLadda :loading="submitting"
              @click="submit">
      Submit
    </VueLadda>
  </template>
  
  <script>
    import VueLadda from 'src/components/utility/VueLadda'
    
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
        VueLadda
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
