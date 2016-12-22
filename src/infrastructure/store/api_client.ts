// Declare process to make tsc happy
declare const process: any
import axios from 'axios'

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 1000
})

export async function getProductProjections(categoryId: string) {
  const params = {
    where: `categoryId:${categoryId}`
  }

  return await instance.get('/product-projections', {
    params
  })
}

export default instance
