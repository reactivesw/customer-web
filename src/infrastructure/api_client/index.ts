// Declare process to make tsc happy
declare const process: any
import axios from 'axios'
import * as endpoints from './endpoints'

// Create a http client instance with some common settings
const instance = axios.create({
  baseURL: process.env.RS_API_URL,
  timeout: 1000
})

export async function getProductProjections(categoryId: string) {
  const params = {
    where: `categoryId:${categoryId}`
  }
  return await getApiResult(endpoints.PRODUCT_PROJECTION, { params })
}

export async function getCategories() {
  return await getApiResult(endpoints.CATEGORIES)
}

async function getApiResult(url: string, params?) {
  const response = await instance.get(url, params)
  return response.data.results
}
