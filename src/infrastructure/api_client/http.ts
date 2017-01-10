import axios from 'axios'

// Create a http client instance with some common settings
export default axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 1000
})
